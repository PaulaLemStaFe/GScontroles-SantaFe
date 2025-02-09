fetch("../../../db.json")
    .then(response => response.json())
    .then(data => {
        productos.producttv = data.productstv;
        productos.productac = data.productsaa;
        mostrarProductosSegunParametros(data);
    })
    .catch((error) => console.error("Error al leer el archivo db.json:", error));

let productos = { producttv: [], productac: [], };

function mostrarProductosSegunParametros(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const title = urlParams.get('title') || "Todos Los Productos";
    const productId = urlParams.get('idproduct');

    if (category) {
        document.getElementById("tituloCategoria").textContent = title;
        mostrarCategoria(category, title, productId, data);
    } else {
        mostrarTodos();
    }
}

function mostrarTodos() {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }
    document.getElementById("tituloCategoria").textContent = "Todos Los Productos";
    container.innerHTML = "";
    [...productos.producttv, ...productos.productac].forEach((producto) => {
        crearProducto(container, producto, "img");
        // Actualizar los atributos de la imagen
        updateImageAttributes('product-image', producto.nombre);
    });
}

function mostrarCategoria(categoria, titulo, productId, data) {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }

    // Verificar que la categoría exista en los datos
    if (!productos[categoria]) {
        console.error(`La categoría ${categoria} no se encontró en los datos.`);
        return;
    }

    document.getElementById("tituloCategoria").textContent = titulo;
    container.innerHTML = "";

    let productosCategoria = productos[categoria];

    if (productId) {
        const product = data.productstv.find(p => p.idProduct == productId) || data.productsaa.find(p => p.idProduct == productId);
        if (product) {
            productosCategoria = productosCategoria.filter(
                (p) => [product.modelosoportado01, product.modelosoportado02, product.modelosoportado03, product.modelosoportado04].includes(p.modelosoportado01)
            );
        }
    }

    productosCategoria.forEach((producto) => {
        crearProducto(container, producto, "img");
        // Actualizar los atributos de la imagen
        updateImageAttributes('product-image', producto.nombre);
    });
}
