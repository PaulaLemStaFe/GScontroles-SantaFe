document.addEventListener("DOMContentLoaded", function () {
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            productos.productcs = data.productscs;
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
    container.innerHTML = "";
    document.getElementById("tituloCategoria").textContent = "Todos Los Productos";

    [...data.productscs, ...data.productstv, ...data.productsaa].forEach((producto) => {
        crearProducto(container, producto, "img");
        updateImageAttributes(document.querySelector(`img[src="${producto.img01}"]`), producto);
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

    container.innerHTML = "";
    document.getElementById("tituloCategoria").textContent = titulo;

    let productosCategoria = productos[categoria];

    if (productId) {
        const product = data.productscs.find(p => p.idProduct == productId) ||
                        data.productstv.find(p => p.idProduct == productId) ||
                        data.productsaa.find(p => p.idProduct == productId);

        if (product) {
            const modelosProducto = [
                product.modelosoportado01,
                product.modelosoportado02,
                product.modelosoportado03,
                product.modelosoportado04,
                product.modelosoportado05
            ].filter(Boolean);

            productosCategoria = productosCategoria.filter(p => {
                const modelosComparar = [
                    p.modelosoportado01,
                    p.modelosoportado02,
                    p.modelosoportado03,
                    p.modelosoportado04,
                    p.modelosoportado05
                ].filter(Boolean);

                return modelosProducto.some(modelo => modelosComparar.includes(modelo));
            });
        }
    }

    productosCategoria.forEach((producto) => {
        crearProducto(container, producto, "img");
        updateImageAttributes(document.querySelector(`img[src="${producto.img01}"]`), producto);
    });
}