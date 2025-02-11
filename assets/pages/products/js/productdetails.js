// productdetails.js

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("idproduct");
    if (!productId) {
        console.error("No se encontró el ID del producto en la URL.");
        return;
    }

    mostrarDetallesProducto("../../../../db.json", productId);
});

/**
 * Función para mostrar detalles del producto y productos similares.
 * @param {string} url - La URL del archivo db.json.
 * @param {number} productId - El ID del producto a mostrar.
 */
function mostrarDetallesProducto(url, productId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Buscar el producto en ambas categorías
            let product, similarProducts, productCategory;
            if (product = data.productstv.find((p) => p.idProduct == productId)) {
                similarProducts = data.productstv; // Productos similares de la misma categoría TV
                productCategory = 'producttv';
            } else if (product = data.productsaa.find((p) => p.idProduct == productId)) {
                similarProducts = data.productsaa; // Productos similares de la misma categoría AA
                productCategory = 'productac';
            } else {
                console.error("Producto no encontrado.");
                return;
            }

            // Actualizar los detalles del producto
            const productImage = document.getElementById("product-image");
            productImage.src = product.img;
            updateImageAttributes(productImage, product);

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

            // Buscar productos similares por marca (modelosoportado01), de la misma categoría y excluir el producto actual
            let similarProductsFiltered = similarProducts.filter(
                (p) => 
                    [product.modelosoportado01, product.modelosoportado02, product.modelosoportado03, product.modelosoportado04].includes(p.modelosoportado01) && 
                    p.idProduct != productId
            );

            // Mezclar productos similares para que sean aleatorios
            const similarProductsToShow = shuffle(similarProductsFiltered).slice(0, 6); // Limitar a 6 productos

            // Mostrar productos similares
            const containerSimilar = document.getElementById("similar-products");
            if (containerSimilar) {
                similarProductsToShow.forEach((producto) => {
                    crearProducto(containerSimilar, producto, "img");
                });

                // Mostrar el enlace "Ver Todo" si hay más de 6 productos similares
                const viewAllLink = document.getElementById("view-all-link");
                if (similarProductsFiltered.length > 6) {
                    viewAllLink.style.display = "inline-block";
                    viewAllLink.href = `/assets/pages/products/allproducts.html?category=${productCategory}&title=Controles Remotos de ${productCategory === 'producttv' ? 'Televisores' : 'Aires Acondicionados'}&idproduct=${productId}`;
                } else {
                    viewAllLink.style.display = "none";
                }
            } else {
                console.error("El contenedor para productos similares no se encontró.");
            }
        })
        .catch((error) => console.error("Error al leer el archivo db.json:", error));
}