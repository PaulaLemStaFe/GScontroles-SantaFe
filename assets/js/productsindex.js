// Asegurar que el script se ejecuta después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const containerTV = document.getElementById('productos-tv');
    const containerAA = document.getElementById('productos-aa');

    // Verificar si al menos uno de los contenedores existe
    if (containerTV || containerAA) {
        fetch('../../../db.json')
            .then(response => response.json())
            .then(data => {
                // Procesar productos de TV si el contenedor existe
                if (containerTV) {
                    const productosTV = shuffle(data.productstv).slice(0, 6); // Mezclar y tomar los primeros 6 productos de TV
                    productosTV.forEach(producto => {
                        crearProducto(containerTV, producto, 'img');
                        updateImageAttributes('img', producto.title); // Actualizar los atributos de la imagen
                    });
                } else {
                    console.warn('El contenedor para productos de TV no se encontró en esta página.');
                }

                // Procesar productos de AA si el contenedor existe
                if (containerAA) {
                    const productosAA = shuffle(data.productsaa).slice(0, 6); // Mezclar y tomar los primeros 6 productos de AA
                    productosAA.forEach(producto => {
                        crearProducto(containerAA, producto, 'img_aa');
                        updateImageAttributes('img_aa', producto.title); // Actualizar los atributos de la imagen
                    });
                } else {
                    console.warn('El contenedor para productos de AA no se encontró en esta página.');
                }
            })
            .catch(error => console.error('Error al leer el archivo db.json:', error));
    }
});
