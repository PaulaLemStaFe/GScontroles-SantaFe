// productsindex.js

document.addEventListener('DOMContentLoaded', function() {
    const containerTV = document.getElementById('productos-tv');
    const containerAA = document.getElementById('productos-aa');

    // Verificar si al menos uno de los contenedores existe
    if (containerTV || containerAA) {
        cargarProductos('../../../db.json', containerTV, containerAA);
    }
});
