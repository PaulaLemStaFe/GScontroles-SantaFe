// productsutils.js

/**
 * Crea un elemento de producto y lo agrega al contenedor especificado.
 * @param {HTMLElement} container - El contenedor donde se agregará el producto.
 * @param {Object} producto - Los datos del producto.
 * @param {string} imgClass - La clase CSS para la imagen del producto.
 */
function crearProducto(container, producto, imgClass) {
    if (!container) return;

    // Detectar la URL actual
    const currentUrl = window.location.pathname;
    const showIcons = currentUrl.includes('editionproducts.html');

    const div = document.createElement('div');
    div.className = 'product_item';
    div.innerHTML = `
        <div class="item_img">
            <img class="${imgClass}" src="${producto.img}" alt="${producto.title}" title="${producto.title}">
        </div>
        <h5 class="item_title">${producto.title}</h5>
        <div class="item_code">
            <span class="code">
                <span class="code_text">Código:</span>
                <span class="code_code">${producto.code}</span>
            </span>
        </div>
        ${showIcons ? `
        <div class="item_footer">
            <div class="footer_icons">
                <i class="bi bi-trash-fill" alt="Eliminar" title="Eliminar" onclick="eliminarProducto()"></i>
                <i class="bi bi-pencil-fill" alt="Editar" title="Editar" onclick="editarProducto()"></i>
            </div>
        </div>` : ''}
        <a class="item_link" href="${producto.link}" rel="noopener noreferrer" alt="Ver Producto" title="Ver Producto">Ver Producto</a>
    `;
    container.appendChild(div);
}

/**
 * Mezcla una lista de elementos usando el algoritmo de Fisher-Yates.
 * @param {Array} array - La lista de elementos a mezclar.
 * @returns {Array} La lista mezclada.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
}

/**
 * Actualiza los atributos alt y title de una imagen.
 * @param {HTMLElement} image - La imagen a actualizar.
 * @param {Object} producto - Los datos del producto.
 */
function updateImageAttributes(image, producto) {
    if (image) {
        image.alt = producto.title;
        image.title = producto.title;
    } else {
        console.error('La imagen no se encontró.');
    }
}
