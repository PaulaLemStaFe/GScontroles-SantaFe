// productdetails.js

// Definir el mapeo de categorías
const categoryMap = {
    'productcs': 'convertidor smart',
    'producttv': 'televisor',
    'productac': 'aire acondicionado'
};

// Función para actualizar los detalles del producto en el HTML
function updateProductDetails(product, categoryKey) {
    // Usa el mapeo para obtener la categoría correcta
    const category = categoryMap[categoryKey];
    
    document.querySelectorAll('.product-category').forEach(span => {
        span.textContent = category;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("idproduct");
    if (!productId) {
        console.error("No se encontró el ID del producto en la URL.");
        return;
    }

    mostrarDetallesProducto("https://PaulaLemStaFe.github.io/GScontroles-SantaFe/db.json", productId);
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
            let product, similarProducts, productCategory;
            if (product = data.productscs.find((p) => p.idProduct == productId)) {
                similarProducts = data.productscs;
                productCategory = 'productcs';
            } else if (product = data.productstv.find((p) => p.idProduct == productId)) {
                similarProducts = data.productstv;
                productCategory = 'producttv';
            } else if (product = data.productsaa.find((p) => p.idProduct == productId)) {
                similarProducts = data.productsaa;
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
            document.getElementById("product-soportado5").textContent = product.modelosoportado05;

            // Usar la función para actualizar los detalles con la categoría correcta
            updateProductDetails(product, productCategory);

            // Buscar productos similares por marca (modelosoportado01), de la misma categoría y excluir el producto actual
            let similarProductsFiltered = similarProducts.filter(
                (p) => 
                    [product.modelosoportado01, product.modelosoportado02, product.modelosoportado03,
                    product.modelosoportado04, product.modelosoportado05].includes(p.modelosoportado01) && p.idProduct != productId
            );

            const similarProductsToShow = shuffle(similarProductsFiltered).slice(0, 6); // Limitar a 6 productos

            const containerSimilar = document.getElementById("similar-products");
            if (containerSimilar) {
                similarProductsToShow.forEach((producto) => {
                    crearProducto(containerSimilar, producto, "img");
                });

                const viewAllLink = document.getElementById("view-all-link");
                if (similarProductsFiltered.length > 6) {
                    viewAllLink.href = `https://PaulaLemStaFe.github.io/GScontroles-SantaFe/assets/pages/products/allproducts.html?category=${productCategory}&title=Controles Remotos de ${
                        productCategory === 'producttv' ? 'Televisores' :
                        productCategory === 'productcs' ? 'Convertidores Smart' :
                        'Aires Acondicionados'
                    }&idproduct=${productId}`;
                } else {
                    viewAllLink.style.display = "none";
                }
            } else {
                console.error("El contenedor para productos similares no se encontró.");
            }
        })
        .catch((error) => console.error("Error al leer el archivo db.json:", error));
}
