document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    // Cargar productos desde JSON
    let productos = [];
    fetch('../../../db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            productos = [...(data.producttv || []), ...(data.productsaa || [])];
            console.log("Productos cargados:", productos);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    // Agregar event listener al ícono de búsqueda
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            realizarBusqueda(query);
        }
    });

    // Agregar event listener al input para detectar "Enter"
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                realizarBusqueda(query);
            }
        }
    });

    function realizarBusqueda(query) {
        if (!Array.isArray(productos)) {
            console.error("Productos is not an array:", productos);
            return;
        }
    
        const resultadosFiltrados = productos.filter(producto =>
            (producto.title && producto.title.toLowerCase().includes(query.toLowerCase())) ||
            (producto.modelosoportado01 && producto.modelosoportado01.toLowerCase().includes(query.toLowerCase())) ||
            (producto.modelosoportado02 && producto.modelosoportado02.toLowerCase().includes(query.toLowerCase())) ||
            (producto.modelosoportado03 && producto.modelosoportado03.toLowerCase().includes(query.toLowerCase())) ||
            (producto.modelosoportado04 && producto.modelosoportado04.toLowerCase().includes(query.toLowerCase()))
        );
    
        mostrarResultados(resultadosFiltrados);
    
        // Limpiar el contenido del input
        searchInput.value = '';
    }

    function mostrarResultados(resultados) {
        // Limpiar el contenedor de resultados y mensajes anteriores
        searchResults.innerHTML = "";
    
        // Remover cualquier mensaje anterior fuera del contenedor de productos
        const noResultsContainer = document.querySelector('.no-results-container');
        if (noResultsContainer) {
            noResultsContainer.remove();
        }
    
        if (resultados.length === 0) {
            // Crear el contenedor para los mensajes
            const noResultsDiv = document.createElement('div');
            noResultsDiv.classList.add('no-results-container');
            noResultsDiv.innerHTML = `
                <p class="no-results-message">No se encontraron productos.</p>
                <p class="additional-message">Por favor, contáctenos para consultar.</p>
            `;
    
            // Insertar el contenedor de mensajes antes de searchResults
            searchResults.parentNode.insertBefore(noResultsDiv, searchResults);
        } else {
            if (resultados.length < 6) {
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
