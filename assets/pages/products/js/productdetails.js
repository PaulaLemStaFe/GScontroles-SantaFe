// productdetails.js

const categoryMap = {
    'productcs': 'convertidor smart',
    'producttv': 'televisor',
    'productac': 'aire acondicionado'
};

function updateProductDetails(product, categoryKey) {
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

            // Imagen principal
            const productImage = document.getElementById("product-image");
            const thumbnailsContainer = document.getElementById("product-thumbnails");

            // Lista de imágenes: principal + secundarias + advertencia
            const allImages = [product.img01, product.img02, product.img03, product.img04, product.img05]
                .filter(Boolean)
                .concat("https://github.com/PaulaLemStaFe/GScontroles-SantaFe/blob/master/assets/images/control-warning/CartelAdvertencia.png?raw=true");

            // Mostrar la imagen principal al comienzo
            productImage.src = allImages[0];
            updateImageAttributes(productImage, product);

            // Mostrar miniaturas
            thumbnailsContainer.innerHTML = '';
            allImages.forEach((imgSrc, index) => {
                const thumb = document.createElement("img");
                thumb.src = imgSrc;
                if (index === 0) thumb.classList.add('selected');
            
                // Clic para seleccionar
                thumb.addEventListener('click', () => {
                    document.querySelectorAll('.thumbnails img').forEach(img => img.classList.remove('selected'));
                    thumb.classList.add('selected');
                    productImage.src = imgSrc;
                });
            
                // Hover para cambiar temporalmente la imagen principal
                thumb.addEventListener('mouseenter', () => {
                    productImage.src = imgSrc;
                });
            
                thumbnailsContainer.appendChild(thumb);
            });

            // Mostrar galería de imágenes adicionales
            const galleryContainer = document.getElementById("product-gallery");
            if (galleryContainer) {
                galleryContainer.innerHTML = ""; // Limpiar galería

                const imageKeys = ['img01', 'img02', 'img03', 'img04', 'img05'];
                imageKeys.forEach(key => {
                    if (product[key]) {
                        const imgEl = document.createElement("img");
                        imgEl.src = product[key];
                        imgEl.alt = product.title;
                        imgEl.title = product.title;
                        galleryContainer.appendChild(imgEl);
                    }
                });

                // Imagen de advertencia al final
                const warningImg = document.createElement("img");
                warningImg.src = "https://github.com/PaulaLemStaFe/GScontroles-SantaFe/blob/master/assets/images/control-warning/CartelAdvertencia.png?raw=true";
                warningImg.alt = "Advertencia sobre la compatibilidad del control remoto";
                warningImg.title = "Advertencia: Asegúrese de que su control coincida con la imagen";
                warningImg.classList.add("warning-image");
                galleryContainer.appendChild(warningImg);
            }

            // Resto de los datos
            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-code").textContent = `Código: ${product.code}`;
            document.getElementById("product-color").textContent = `Color: ${product.color}`;
            document.getElementById("product-soportado1").textContent = product.modelosoportado01;
            document.getElementById("product-soportado2").textContent = product.modelosoportado02;
            document.getElementById("product-soportado3").textContent = product.modelosoportado03;
            document.getElementById("product-soportado4").textContent = product.modelosoportado04;
            document.getElementById("product-soportado5").textContent = product.modelosoportado05;

            updateProductDetails(product, productCategory);

            // Productos similares
            const similarProductsFiltered = similarProducts.filter(
                (p) =>
                    [product.modelosoportado01, product.modelosoportado02, product.modelosoportado03,
                    product.modelosoportado04, product.modelosoportado05].includes(p.modelosoportado01) && p.idProduct != productId
            );

            const similarProductsToShow = shuffle(similarProductsFiltered).slice(0, 6);
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
            }
        })
        .catch((error) => console.error("Error al leer el archivo db.json:", error));
}

// Funcionalidad de zoom tipo lupa
const zoomLens = document.querySelector('.zoom-lens');
const zoomResult = document.querySelector('.zoom-result');

// Nos aseguramos de que el contenedor tenga posición relativa
const imageContainer = document.getElementById("product-image-container");
imageContainer.style.position = "relative";

productImage.addEventListener('mouseenter', () => {
    zoomLens.style.display = 'block';
    zoomResult.style.display = 'block';
    zoomResult.style.backgroundImage = `url(${productImage.src})`;
});

productImage.addEventListener('mousemove', (e) => {
    const rect = productImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensX = x - zoomLens.offsetWidth / 2;
    const lensY = y - zoomLens.offsetHeight / 2;

    // Limites para que la lupa no se salga de la imagen
    const maxX = productImage.offsetWidth - zoomLens.offsetWidth;
    const maxY = productImage.offsetHeight - zoomLens.offsetHeight;

    zoomLens.style.left = Math.max(0, Math.min(lensX, maxX)) + "px";
    zoomLens.style.top = Math.max(0, Math.min(lensY, maxY)) + "px";

    const zoomX = (x / productImage.offsetWidth) * 100;
    const zoomY = (y / productImage.offsetHeight) * 100;

    zoomResult.style.backgroundPosition = `${zoomX}% ${zoomY}%`;
});

productImage.addEventListener('mouseleave', () => {
    zoomLens.style.display = 'none';
    zoomResult.style.display = 'none';
});
