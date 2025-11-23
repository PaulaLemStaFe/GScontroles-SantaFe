// search.js (versión final - reemplazar archivo existente)

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const autocompleteResults = document.getElementById("autocomplete-results");
    const noResultsContainer = document.getElementById("no-results-container");

    // Custom select elements (tu HTML tiene estos IDs)
    const selectBox = document.getElementById("category-select");
    const optionsBox = document.getElementById("category-options");
    const textDisplay = selectBox ? selectBox.querySelector(".custom-select-text") : null;

    // Datos (serán cargados desde db.json)
    let productos = [];
    let productosTV = [];
    let productosCS = [];
    let productosAA = [];
    let AR799 = null; // referencia al control universal AA
    let currentFocus = -1;
    let selectedCategory = ""; // puede ser "productstv" | "productscs" | "productsaa" | ""

    document.getElementById("reset-search").addEventListener("click", () => {
        // limpiar URL
        window.location.href = "search.html";
    });


    // ---------- utilidades de URL ----------
    function obtenerParametroURL(nombre) {
        const params = new URLSearchParams(window.location.search);
        return params.get(nombre) || "";
    }

    function construirURLConParams(brand, cat) {
        const params = new URLSearchParams();
        if (brand) params.set("brand", brand);
        if (cat) params.set("cat", cat);
        return `${window.location.pathname}?${params.toString()}`;
    }

    // ---------- carga inicial de productos ----------
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            productosTV = data.productstv || [];
            productosCS = data.productscs || [];
            productosAA = data.productsaa || [];

            // mantenemos un array combinado para compatibilidad con tu lógica original
            productos = [...productosCS, ...productosTV, ...productosAA];

            // identificar AR799 por código (según lo indicado)
            AR799 = productosAA.find(p => p.code && p.code.trim().toUpperCase() === "AR 799");

            // Si la URL trae parámetros, los aplicamos (esto permite compartir enlaces)
            const brandURL = obtenerParametroURL("brand");
            const catURL = obtenerParametroURL("cat");

            if (catURL) {
                // validamos la categoría esperada (evitamos valores inválidos)
                if (["productstv", "productscs", "productsaa"].includes(catURL)) {
                    setCategoriaDesdeURL(catURL);
                }
            }

            if (brandURL) {
                searchInput.value = decodeURIComponent(brandURL);
                // Ejecutamos la búsqueda con la categoría seleccionada si la hubiese
                realizarBusquedaConCategoria(searchInput.value);
            } else if (selectedCategory === "productscs") {
                // Si la URL pedía sólo la categoría convertidores smart, mostrarla
                mostrarResultados(productosCS);
            }
        })
        .catch(error => console.error('Error fetching products:', error));

    // ---------- AUTOCOMPLETADO ----------
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            const marcas = obtenerMarcasDisponibles(query);
            mostrarResultadosAutocompletado(marcas);
        } else {
            autocompleteResults.innerHTML = '';
            autocompleteResults.style.display = 'none';
        }
    });

    searchInput.addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase();
        const marcas = obtenerMarcasDisponibles(query);
        mostrarResultadosAutocompletado(marcas);
    });

    // navegación con flechas en autocompletado
    searchInput.addEventListener("keydown", (e) => {
        const items = autocompleteResults.querySelectorAll(".autocomplete-item");
        if (items.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            currentFocus++;
            marcarElementoActivo(items);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            currentFocus--;
            marcarElementoActivo(items);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) {
                items[currentFocus].click();
            } else {
                const query = searchInput.value.trim();
                if (query) {
                    // redirigir y conservar categoría para que la recarga funcione
                    window.location.href = construirURLConParams(encodeURIComponent(query), selectedCategory || "");
                }
            }
        }
    });

    document.addEventListener("click", (e) => {
        // cerrar autocompletado si se hace clic fuera (y no es el input)
        if (!autocompleteResults.contains(e.target) && e.target !== searchInput) {
            autocompleteResults.style.display = 'none';
        }

        // cerrar custom-select si se hace clic fuera
        if (selectBox && !selectBox.contains(e.target) && optionsBox && !optionsBox.contains(e.target)) {
            selectBox.classList.remove("open");
            if (optionsBox) optionsBox.style.display = "none";
        }
    });

    function marcarElementoActivo(items) {
        quitarClaseActiva(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("autocomplete-active");
        items[currentFocus].scrollIntoView({ block: 'nearest' });
    }

    function quitarClaseActiva(items) {
        items.forEach(item => item.classList.remove("autocomplete-active"));
    }

    function obtenerMarcasDisponibles(query) {
        // Si categoría convertidores smart -> no autocompletado
        if (selectedCategory === "productscs") return [];

        let fuente;
        if (selectedCategory === "productstv") fuente = productosTV;
        else if (selectedCategory === "productsaa") fuente = productosAA;
        else fuente = [...productosTV, ...productosAA, ...productosCS];

        return fuente.flatMap(producto => [
            producto.modelosoportado01, producto.modelosoportado02, producto.modelosoportado03, producto.modelosoportado04,
            producto.modelosoportado05, producto.modelosoportado06, producto.modelosoportado07, producto.modelosoportado08,
            producto.modelosoportado09, producto.modelosoportado10
        ])
            .filter(marca => marca && marca.toLowerCase().includes(query))
            .filter((marca, index, self) => self.indexOf(marca) === index)
            .sort((a, b) => a.localeCompare(b));
    }

    function mostrarResultadosAutocompletado(marcas) {
        autocompleteResults.innerHTML = '';
        currentFocus = -1;

        if (marcas.length > 0) {
            marcas.forEach(marca => {
                const item = document.createElement("div");
                item.classList.add("autocomplete-item");
                item.textContent = marca;
                item.addEventListener("click", () => {
                    searchInput.value = marca;
                    autocompleteResults.innerHTML = '';
                    autocompleteResults.style.display = 'none';

                    actualizarTitulo(selectedCategory, marca);

                    const brandParam = encodeURIComponent(marca);
                    window.location.href = construirURLConParams(brandParam, selectedCategory || "");
                });
                autocompleteResults.appendChild(item);
            });
            autocompleteResults.style.display = 'block';
        } else {
            autocompleteResults.style.display = 'none';
        }
    }

    // ---------- BÚSQUEDA (botón y Enter): forzamos redirección con cat si aplica) ----------
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            actualizarTitulo(selectedCategory, query);
            window.location.href = construirURLConParams(encodeURIComponent(query), selectedCategory || "");
        }
    });

    searchInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                actualizarTitulo(selectedCategory, query);
                window.location.href = construirURLConParams(encodeURIComponent(query), selectedCategory || "");
            }
        }
    });

    // ---------- BÚSQUEDA LOCAL que respeta categoría (se usa después de recargar o al mostrar resultados sin recarga) ----------
    function realizarBusquedaConCategoria(rawQuery) {
        actualizarTitulo(selectedCategory, rawQuery);

        const query = rawQuery.toLowerCase().trim();
        let resultados = [];

        // Si categoría seleccionada = TV
        if (selectedCategory === "productstv") {
            resultados = filtrarPorMarca(productosTV, query);
        }
        // Si convertidores smart -> mostrar todos los convertidores
        else if (selectedCategory === "productscs") {
            resultados = [...productosCS];
        }
        // Si aire acondicionado -> siempre mostrar AR799 al inicio y luego los que coincidan
        else if (selectedCategory === "productsaa") {
            const coincidencias = filtrarPorMarca(productosAA, query);
            resultados = [];
            if (AR799) resultados.push(AR799);
            // evitar duplicado si AR799 ya estaba en coincidencias
            coincidencias.forEach(p => {
                if (!AR799 || p.idProduct !== AR799.idProduct) resultados.push(p);
            });
        }
        // Sin categoría -> global (TV + AA + CS). Si la marca pertenece a AA, agregar AR799 al inicio.
        else {
            resultados = [
                ...filtrarPorMarca(productosTV, query),
                ...filtrarPorMarca(productosAA, query),
                ...filtrarPorMarca(productosCS, query),
            ];

            const marcasAA = obtenerMarcasDe(productosAA);
            const esMarcaAire = marcasAA.some(m => m.toLowerCase() === query);
            if (esMarcaAire && AR799) {
                // insertar AR799 al inicio si no está ya
                if (!resultados.find(r => r.idProduct === AR799.idProduct)) {
                    resultados.unshift(AR799);
                }
            }
        }

        // eliminar duplicados (por si algo se mezcló)
        resultados = resultados.filter((p, idx, arr) => arr.findIndex(x => x.idProduct === p.idProduct) === idx);

        mostrarResultados(resultados);
    }

    function filtrarPorMarca(array, query) {
        if (!query) return []; // si no hay consulta, devolvemos vacío (salvo en productscs que mostramos todo)
        return array.filter(producto =>
            [
                producto.modelosoportado01, producto.modelosoportado02, producto.modelosoportado03, producto.modelosoportado04,
                producto.modelosoportado05, producto.modelosoportado06, producto.modelosoportado07, producto.modelosoportado08,
                producto.modelosoportado09, producto.modelosoportado10
            ].some(marca => marca && marca.toLowerCase() === query)
        );
    }

    function obtenerMarcasDe(array) {
        return array.flatMap(prod => [
            prod.modelosoportado01, prod.modelosoportado02, prod.modelosoportado03, prod.modelosoportado04,
            prod.modelosoportado05, prod.modelosoportado06, prod.modelosoportado07, prod.modelosoportado08,
            prod.modelosoportado09, prod.modelosoportado10
        ]).filter(m => m && m.trim() !== "");
    }

    // ---------- mostrarResultados ---------- (usa tu función crearProducto externa)
    function mostrarResultados(resultados) {
        searchResults.innerHTML = "";
        noResultsContainer.innerHTML = "";

        if (!Array.isArray(resultados) || resultados.length === 0) {
            noResultsContainer.innerHTML = `
                <div class="no-results-container">
                    <p class="no-results-message">No se encontraron productos.</p>
                    <p class="additional-message">Por favor, contáctenos para consultar.</p>
                </div>
            `;
            return;
        }

        if (resultados.length < 6) {
            searchResults.classList.add('centrado');
        } else {
            searchResults.classList.remove('centrado');
            searchResults.style.gridTemplateColumns = 'repeat(6, 1fr)';
        }

        resultados.forEach(producto => {
            // usar tu función global crearProducto (assets/js/productsutils.js)
            if (typeof crearProducto === "function") {
                crearProducto(searchResults, producto, "img");
            } else {
                // fallback simple en caso de que crearProducto no exista (muy raro)
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `<img src="${producto.img01 || ''}" alt="${producto.title || ''}"><p>${producto.title || ''}</p><p>${producto.code || ''}</p>`;
                searchResults.appendChild(card);
            }
        });
    }

    // ---------- CUSTOM SELECT (abrir / cerrar / elegir opción) ----------
    if (selectBox && optionsBox && textDisplay) {
        // abrir/cerrar menú al click
        selectBox.addEventListener("click", (e) => {
            e.stopPropagation();
            selectBox.classList.toggle("open");
            optionsBox.style.display = selectBox.classList.contains("open") ? "block" : "none";
        });

        // evento para cada opción
        const optionNodes = optionsBox.querySelectorAll(".custom-option");
        optionNodes.forEach(option => {
            option.addEventListener("click", (e) => {
                e.stopPropagation();
                const value = e.currentTarget.dataset.value; // productstv | productscs | productsaa
                const label = e.currentTarget.textContent;

                // asignar y mostrar
                selectedCategory = value || "";
                textDisplay.textContent = label || "Seleccione una categoría";

                // cerrar UI
                selectBox.classList.remove("open");
                optionsBox.style.display = "none";

                // marcar visualmente
                optionNodes.forEach(o => o.classList.remove("selected"));
                e.currentTarget.classList.add("selected");

                // acción según categoría
                filtrarCategoria(selectedCategory);
            });
        });
    }

    // ---------- filtrarCategoria: comportamientos cuando cambias de categoría ----------
    function filtrarCategoria(cat) {
        selectedCategory = cat || "";

        // limpiar autocompletado
        autocompleteResults.innerHTML = "";
        autocompleteResults.style.display = "none";
        currentFocus = -1;

        // Si es convertidor smart -> deshabilitar buscador y mostrar todos los cs
        if (selectedCategory === "productscs") {
            searchInput.value = "";
            searchInput.disabled = true;
            mostrarResultados(productosCS);
            actualizarTitulo("productscs", "");
            return;
        }

        // Para TV o AA → habilitar buscador
        searchInput.disabled = false;

        // Si hay texto en el buscador, recalculamos autocompletado y resultados
        const q = searchInput.value.trim().toLowerCase();
        if (q) {
            const marcas = obtenerMarcasDisponibles(q);
            mostrarResultadosAutocompletado(marcas);
            return;
        }

        // Si no hay texto en el buscador, NO mostramos nada
        searchResults.innerHTML = "";
        noResultsContainer.innerHTML = "";

        actualizarTitulo(selectedCategory, searchInput.value.trim());
    }

    // ---------- ayuda para setear categoría desde parámetros URL al cargar ----------
    function setCategoriaDesdeURL(catURL) {
        if (!selectBox || !optionsBox || !textDisplay) {
            selectedCategory = catURL;
            return;
        }
        const optionNode = Array.from(optionsBox.querySelectorAll(".custom-option"))
            .find(o => o.dataset.value === catURL);
        if (optionNode) {
            // marcar visualmente
            optionsBox.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected"));
            optionNode.classList.add("selected");
            textDisplay.textContent = optionNode.textContent;
        } else {
            textDisplay.textContent = "Seleccione una categoría";
        }
        selectedCategory = catURL;
    }

    function mostrarOcultarSecciones(mostrarTitulo) {
        const buscadorSection = document.querySelector(".search-section_content");
        const botonReset = document.getElementById("reset-search");

        if (mostrarTitulo) {
            // Ocultamos sección y mostramos el botón
            if (buscadorSection) buscadorSection.style.display = "none";
            if (botonReset) botonReset.style.display = "block";
        } else {
            // Mostramos sección y ocultamos botón
            if (buscadorSection) buscadorSection.style.display = "flex"; // o block según tu diseño
            if (botonReset) botonReset.style.display = "none";
        }
    }

    function actualizarTitulo(cat, marca) {
        const title = document.getElementById("search-title");

        // Si no hay marca y la categoría NO es convertidores smart → no mostramos título
        if (!marca && cat !== "productscs") {
            title.innerHTML = "";
            mostrarOcultarSecciones(false);
            return;
        }

        if (!cat && !marca) {
            title.innerHTML = "";
            mostrarOcultarSecciones(false);
            return;
        }

        let textoCategoria = "";
        let textoMarca = "";

        // Categoría en strong
        switch (cat) {
            case "productstv":
                textoCategoria = "<strong>para televisores</strong>";
                break;
            case "productscs":
                textoCategoria = "<strong>para convertidores smart</strong>";
                break;
            case "productsaa":
                textoCategoria = "<strong>para aires acondicionados</strong>";
                break;
        }

        // Marca en strong
        if (marca) {
            textoMarca = `marca <strong>${marca}</strong>`;
        }

        // Armado del título
        let textoFinal = `Resultados de la búsqueda de controles remotos<br>`;
        if (textoCategoria) textoFinal += textoCategoria;
        if (textoMarca) textoFinal += (textoCategoria ? " " : "") + textoMarca;

        title.innerHTML = textoFinal;

        // MOSTRAMOS EL TÍTULO → ocultamos sección y mostramos botón
        mostrarOcultarSecciones(true);
    }

});
