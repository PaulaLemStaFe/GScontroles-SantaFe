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
            productos = [...(data.productstv || []), ...(data.productsaa || [])];
            console.log("Productos cargados:", productos);
        })
        .catch(error => console.error('Error fetching products:', error));

    /**
     * Event listener para el input de búsqueda
     * Detecta cambios y actualiza los resultados de autocompletado
     */
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

    /**
     * Event listener para el input de búsqueda
     * Muestra los resultados de autocompletado al hacer clic
     */
    searchInput.addEventListener("click", () => {
        const marcas = obtenerMarcasDisponibles('');
        mostrarResultadosAutocompletado(marcas);
    });

    /**
     * Obtiene una lista de marcas disponibles que coinciden con la consulta
     * @param {string} query - La consulta de búsqueda
     * @returns {Array} - Lista de marcas disponibles
     */
    function obtenerMarcasDisponibles(query) {
        return productos.flatMap(producto => [
            producto.modelosoportado01, producto.modelosoportado02, 
            producto.modelosoportado03, producto.modelosoportado04])
            .filter((marca, index, self) => marca && marca.toLowerCase().includes(query) && self.indexOf(marca) === index)
            .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
    }

    /**
     * Muestra los resultados de autocompletado
     * @param {Array} marcas - Lista de marcas a mostrar
     */
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

    /**
     * Event listener para el ícono de búsqueda
     * Realiza la búsqueda al hacer clic en el ícono
     */
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) realizarBusqueda(query);
    });

    /**
     * Event listener para el input de búsqueda
     * Realiza la búsqueda al presionar "Enter"
     */
    searchInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) realizarBusqueda(query);
        }
    });

    /**
     * Realiza la búsqueda de productos por marca
     * @param {string} query - La consulta de búsqueda
     */
    function realizarBusqueda(query) {
        if (!Array.isArray(productos)) {
            console.error("Productos is not an array:", productos);
            return;
        }

        // Buscar todos los productos que coincidan con la marca
        const resultadosFiltrados = productos.filter(producto =>
            [producto.modelosoportado01, 
            producto.modelosoportado02, 
            producto.modelosoportado03, 
            producto.modelosoportado04].some(marca => 
                marca && marca.toLowerCase() === query.toLowerCase()
            )
        );

        mostrarResultados(resultadosFiltrados);

        // Limpiar el contenido del input
        searchInput.value = '';
        autocompleteResults.innerHTML = '';
        autocompleteResults.style.display = 'none';
    }

    /**
     * Muestra los resultados de la búsqueda en el DOM
     * @param {Array} resultados - Lista de productos encontrados
     */
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
                searchResults.style.gridTemplateColumns = 'repeat(6, 1fr)'; // Asegura que haya 6 columnas
            }

            resultados.forEach(producto => {
                // Usar la función crearProducto del archivo productsutils.js
                crearProducto(searchResults, producto, "img");
            });
        }
    }
});
