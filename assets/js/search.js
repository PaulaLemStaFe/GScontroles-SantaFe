document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const autocompleteResults = document.getElementById("autocomplete-results");
    const noResultsContainer = document.getElementById("no-results-container");

    // Cargar productos desde JSON
    let productos = [];
    fetch('../../../db.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            productos = [...(data.producttv || []), ...(data.productsaa || [])];
            console.log("Productos cargados:", productos);
        })
        .catch(error => console.error('Error fetching products:', error));

    // Agregar event listener al input para detectar cambios y clics
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
        const marcas = obtenerMarcasDisponibles('');
        mostrarResultadosAutocompletado(marcas);
    });

    function obtenerMarcasDisponibles(query) {
        return productos.flatMap(producto => [
            producto.modelosoportado01, producto.modelosoportado02, 
            producto.modelosoportado03, producto.modelosoportado04])
            .filter((marca, index, self) => marca && marca.toLowerCase().includes(query) && self.indexOf(marca) === index)
            .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
    }

    // Mostrar resultados de autocompletado
    function mostrarResultadosAutocompletado(marcas) {
        autocompleteResults.innerHTML = '';
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

    // Agregar event listener al ícono de búsqueda
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) realizarBusqueda(query);
    });

    // Agregar event listener al input para detectar "Enter"
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
            [producto.title, producto.modelosoportado01, 
            producto.modelosoportado02, producto.modelosoportado03, 
            producto.modelosoportado04].some(marca => 
                marca && marca.toLowerCase().includes(query.toLowerCase())
            )
        );

        mostrarResultados(resultadosFiltrados);

        // Limpiar el contenido del input
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
            if (resultados.length < 6 || (resultados.length >= 7 && resultados.length <= 11)) {
                searchResults.classList.add('centrado');
            } else {
                searchResults.classList.remove('centrado');
                searchResults.style.gridTemplateColumns = 'repeat(6, 1fr)'; // Asegura que haya 6 columnas
            }

            resultados.forEach(producto => {
                const productoElemento = document.createElement("div");
                productoElemento.classList.add("product_item");
                productoElemento.innerHTML = `
                    <div class="item_img">
                        <img class="img" src="${producto.img}" alt="${producto.title}" title="${producto.title}">
                    </div>
                    <h5 class="item_title">${producto.title}</h5>
                    <div class="item_code">
                        <span class="code">
                            <span class="code_text">Código:</span>
                            <span class="code_code">${producto.code}</span>
                        </span>
                    </div>
                    <div class="item_footer">
                        <p class="item_id">${producto.code}</p>
                        <div class="footer_icons">
                            <i class="bi bi-trash-fill" alt="Eliminar" title="Eliminar"></i>
                            <i class="bi bi-pencil-fill" alt="Editar" title="Editar"></i>
                        </div>
                    </div>
                    <a class="item_link" href="${producto.link}" rel="noopener noreferrer" alt="Ver Producto" title="Ver Producto">Ver Producto</a>
                `;
                searchResults.appendChild(productoElemento);
            });
        }
    }
});
