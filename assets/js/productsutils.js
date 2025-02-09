// productutils.js
function crearProducto(container, producto, imgClass) {
    if (!container) return; // Verificación adicional para evitar errores
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
        <div class="item_footer">
            <p class="item_id">${producto.code}</p>
            <div class="footer_icons">
                <i class="bi bi-trash-fill" alt="Eliminar" title="Eliminar"></i>
                <i class="bi bi-pencil-fill" alt="Editar" title="Editar"></i>
            </div>
        </div>
        <a class="item_link" href="${producto.link}" rel="noopener noreferrer" alt="Ver Producto" title="Ver Producto">Ver Producto</a>
    `;
    container.appendChild(div);
}

// Función para mezclar una lista de elementos
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Actualiza los atributos alt y title de una imagen.
 * @param {string} imageId - El ID de la imagen.
 * @param {string} titleText - El texto para los atributos alt y title.
 */
function updateImageAttributes(image, producto) {
    if (image) {
        image.alt = producto.title;
        image.title = producto.title;
    } else {
        console.error('La imagen no se encontró.');
    }
}
