// Cargar datos de db.json y procesar productos
fetch("../../../db.json")
    .then((response) => response.json())
    .then((data) => {
        // Asignar productos a las categorías
        productos.producttv = data.producttv;
        productos.productac = data.productsaa; // Asegúrate de que esta clave coincida con la estructura en tu db.json
        // Mostrar productos según los parámetros de la URL
        mostrarProductosSegunParametros();
    })
    .catch((error) => console.error("Error al leer el archivo db.json:", error));

let productos = {
    producttv: [],
    productac: [],
};

// Función para mostrar productos según los parámetros de la URL
function mostrarProductosSegunParametros() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const title = urlParams.get('title') || "Todos Los Productos"; // Título predeterminado si no se proporciona

    if (category === 'all') {
        mostrarTodos();
    } else if (category) {
        mostrarCategoria(category, title);
    } else {
        mostrarTodos(); // Mostrar todos los productos si no hay categoría específica
    }
}

// Función para mostrar todos los productos
function mostrarTodos() {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }

    document.getElementById("tituloCategoria").textContent = "Todos Los Productos";
    container.innerHTML = "";
    [...productos.producttv, ...productos.productac].forEach((producto) => {
        crearProducto(container, producto, "img"); // Llama a la función desde productsindex.js
    });
}

// Función para mostrar productos por categoría
function mostrarCategoria(categoria, titulo) {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }

    document.getElementById("tituloCategoria").textContent = titulo;
    container.innerHTML = "";
    productos[categoria].forEach((producto) => {
        crearProducto(container, producto, "img"); // Llama a la función desde productsindex.js
    });
}
