// productsindex.js

document.addEventListener('DOMContentLoaded', function() {
    const containerTV = document.getElementById('productos-tv');
    const containerAA = document.getElementById('productos-aa');

    // Verificar si al menos uno de los contenedores existe
    if (containerTV || containerAA) {
        cargarProductos('../../../db.json', containerTV, containerAA);
    }
});

/**
 * Función para cargar y procesar productos desde la base de datos.
 * @param {string} url - La URL del archivo db.json.
 * @param {HTMLElement} containerTV - El contenedor para productos de TV.
 * @param {HTMLElement} containerAA - El contenedor para productos de AA.
 */
function cargarProductos(url, containerTV, containerAA) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Procesar productos de TV si el contenedor existe
            if (containerTV) {
                const productosTV = shuffle(data.productstv).slice(0, 6); // Mezclar y tomar los primeros 6 productos de TV
                productosTV.forEach(producto => {
                    crearProducto(containerTV, producto, 'img');
                    updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto); // Actualizar los atributos de la imagen
                });
            } else {
                console.warn('El contenedor para productos de TV no se encontró en esta página.');
            }

            // Procesar productos de AA si el contenedor existe
            if (containerAA) {
                const productosAA = shuffle(data.productsaa).slice(0, 6); // Mezclar y tomar los primeros 6 productos de AA
                productosAA.forEach(producto => {
                    crearProducto(containerAA, producto, 'img_aa');
                    updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto); // Actualizar los atributos de la imagen
                });
            } else {
                console.warn('El contenedor para productos de AA no se encontró en esta página.');
            }
        })
        .catch(error => console.error('Error al leer el archivo db.json:', error));
}
