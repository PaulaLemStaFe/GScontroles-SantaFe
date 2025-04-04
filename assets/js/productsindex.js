// productsindex.js

document.addEventListener('DOMContentLoaded', function() {
    const containerCS = document.getElementById('productos-cs');
    const containerTV = document.getElementById('productos-tv');
    const containerAA = document.getElementById('productos-aa');

    // Verificar si al menos uno de los contenedores existe
    if (containerCS || containerTV || containerAA) {
        cargarProductos('https://PaulaLemStaFe.github.io/GScontroles-SantaFe/db.json', containerCS, containerTV, containerAA);
    }
});

/**
 * Función para cargar y procesar productos desde la base de datos.
 * @param {string} url - La URL del archivo db.json.
 * @param {HTMLElement} containerCS - El contenedor para productos de CS.
 * @param {HTMLElement} containerTV - El contenedor para productos de TV.
 * @param {HTMLElement} containerAA - El contenedor para productos de AA.
 */
function cargarProductos(url, containerCS, containerTV, containerAA) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Convertidores Smart
            if (containerCS) {
                const productosCS = shuffle(data.productscs).slice(0, 6);
                productosCS.forEach(producto => {
                    crearProducto(containerCS, producto, 'img');
                    updateImageAttributes(document.querySelector(`img[src="${producto.img01}"]`), producto);
                });
            } else {
                console.warn('El contenedor para productos de CS no se encontró en esta página.');
            }

            // Televisores
            if (containerTV) {
                const productosTV = shuffle(data.productstv).slice(0, 6);
                productosTV.forEach(producto => {
                    crearProducto(containerTV, producto, 'img');
                    updateImageAttributes(document.querySelector(`img[src="${producto.img01}"]`), producto);
                });
            } else {
                console.warn('El contenedor para productos de TV no se encontró en esta página.');
            }

            // Aires Acondicionados
            if (containerAA) {
                const productosAA = shuffle(data.productsaa).slice(0, 6);
                productosAA.forEach(producto => {
                    crearProducto(containerAA, producto, 'img_aa');
                    updateImageAttributes(document.querySelector(`img[src="${producto.img01}"]`), producto);
                });
            } else {
                console.warn('El contenedor para productos de AA no se encontró en esta página.');
            }
        })
        .catch(error => console.error('Error al leer el archivo db.json:', error));
}
