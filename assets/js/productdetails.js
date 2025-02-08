document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("idproduct");
    if (!productId) {
        console.error("No se encontró el ID del producto en la URL.");
        return;
    }

    fetch("../../../db.json")
        .then((response) => response.json())
        .then((data) => {
            // Buscar el producto en ambas categorías
            let product =
                data.producttv.find((p) => p.idProduct == productId) ||
                data.productsaa.find((p) => p.idProduct == productId);
            if (!product) {
                console.error("Producto no encontrado.");
                return;
            }

            // Actualizar los detalles del producto
            document.getElementById("product-image").src = product.img;
            document.getElementById("product-image").alt = product.title;
            document.getElementById("product-image").title = product.title;
            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-code").textContent = `Código: ${product.code}`;
            document.getElementById("product-color").textContent = `Color: ${product.color}`;
            document.getElementById("product-soportado1").textContent = product.modelosoportado01;
            document.getElementById("product-soportado2").textContent = product.modelosoportado02;
            document.getElementById("product-soportado3").textContent = product.modelosoportado03;
            document.getElementById("product-soportado4").textContent = product.modelosoportado04;
            document.getElementById("product-details1").textContent = product.details01;
            document.getElementById("product-details2").textContent = product.details02;
            document.getElementById("product-details3").textContent = product.details03;

            // Buscar productos similares por marca (modelosoportado01)
            let similarProducts = data.producttv
                .concat(data.productsaa)
                .filter(
                    (p) =>
                        [product.modelosoportado01, product.modelosoportado02, product.modelosoportado03, product.modelosoportado04].includes(p.modelosoportado01) && p.idproduct != productId
                );

            // Mostrar productos similares
            const containerSimilar = document.getElementById("similar-products");
            if (containerSimilar) {
                similarProducts.forEach((producto) => {
                    crearProducto(containerSimilar, producto, "img"); // Llama a la función desde productsindex.js
                });
            } else {
                console.error("El contenedor para productos similares no se encontró.");
            }
        })
        .catch((error) => console.error("Error al leer el archivo db.json:", error));
});
