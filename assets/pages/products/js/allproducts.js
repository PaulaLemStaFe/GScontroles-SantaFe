document.addEventListener("DOMContentLoaded", function () {
    fetch("../../../../db.json")
        .then(response => response.json())
        .then(data => {
            productos.producttv = data.productstv;
            productos.productac = data.productsaa;
            mostrarProductosSegunParametros(data);
        })
        .catch((error) => console.error("Error al leer el archivo db.json:", error));
});

function mostrarProductosSegunParametros(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const title = urlParams.get('title') || "Todos Los Productos";
    const productId = urlParams.get('idproduct');

    if (category === 'all') {
        document.getElementById("tituloCategoria").textContent = "Todos Los Productos";
        mostrarTodos(data);
    } else if (category) {
        document.getElementById("tituloCategoria").textContent = title;
        mostrarCategoria(category, title, productId, data);
    } else {
        mostrarTodos(data);
    }
}

function mostrarTodos(data) {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }
    document.getElementById("tituloCategoria").textContent = "Todos Los Productos";
    container.innerHTML = "";
    [...data.productstv, ...data.productsaa].forEach((producto) => {
        crearProducto(container, producto, "img");
        updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto);
    });
}

function mostrarCategoria(categoria, titulo, productId, data) {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }

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
        updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto);
    });
}
