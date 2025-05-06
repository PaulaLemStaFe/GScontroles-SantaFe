document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const autocompleteResults = document.getElementById("autocomplete-results");
    const noResultsContainer = document.getElementById("no-results-container");

    let productos = [];
    let currentFocus = -1; // Se mantiene global dentro del DOMContentLoaded

    fetch('../../db.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            productos = [...(data.productscs || []), ...(data.productstv || []), ...(data.productsaa || [])];
            console.log("Productos cargados:", productos);
        })
        .catch(error => console.error('Error fetching products:', error));

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

    document.addEventListener("click", (e) => {
        if (!autocompleteResults.contains(e.target) && e.target !== searchInput) {
            autocompleteResults.style.display = 'none';
        }
    });

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
            }
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
        return productos.flatMap(producto => [
            producto.modelosoportado01, producto.modelosoportado02,
            producto.modelosoportado03, producto.modelosoportado04, producto.modelosoportado05])
            .filter((marca, index, self) => marca && marca.toLowerCase().includes(query) && self.indexOf(marca) === index)
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
                    realizarBusqueda(marca);
                });
                autocompleteResults.appendChild(item);
            });
            autocompleteResults.style.display = 'block';
        } else {
            autocompleteResults.style.display = 'none';
        }
    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) realizarBusqueda(query);
    });

    searchInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) realizarBusqueda(query);
        }
    });

    function realizarBusqueda(query) {
        if (!Array.isArray(productos)) {
            console.error("Productos is not an array:", productos);
            return;
        }

        const resultadosFiltrados = productos.filter(producto =>
            [producto.modelosoportado01, producto.modelosoportado02, producto.modelosoportado03,
            producto.modelosoportado04, producto.modelosoportado05].some(marca =>
                marca && marca.toLowerCase() === query.toLowerCase()
            )
        );

        mostrarResultados(resultadosFiltrados);
        searchInput.value = '';
        autocompleteResults.innerHTML = '';
        autocompleteResults.style.display = 'none';
    }

    function mostrarResultados(resultados) {
        searchResults.innerHTML = "";
        noResultsContainer.innerHTML = "";

        if (resultados.length === 0) {
            noResultsContainer.innerHTML = `
                <div class="no-results-container">
                    <p class="no-results-message">No se encontraron productos.</p>
                    <p class="additional-message">Por favor, contáctenos para consultar.</p>
                </div>
            `;
        } else {
            if (resultados.length < 6) {
                searchResults.classList.add('centrado');
            } else {
                searchResults.classList.remove('centrado');
                searchResults.style.gridTemplateColumns = 'repeat(6, 1fr)';
            }

            resultados.forEach(producto => {
                crearProducto(searchResults, producto, "img");
            });
        }
    }
});
