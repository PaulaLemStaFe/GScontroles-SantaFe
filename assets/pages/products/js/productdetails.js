// productdetails.js (actualizado)

const categoryMap = {
    productcs: "convertidor smart",
    producttv: "televisor",
    productac: "aire acondicionado",
};

function updateProductDetails(product, categoryKey) {
    const category = categoryMap[categoryKey];
    document.querySelectorAll(".product-category").forEach((span) => {
        span.textContent = category;
    });
}

function updateImageAttributes(imgElement, product) {
    imgElement.alt = product.title;
    imgElement.title = product.title;
}

function setupZoomFunctionality(productImage) {
    const zoomLens = document.querySelector(".zoom-lens");
    const zoomResult = document.querySelector(".zoom-result");
    const imageContainer = document.getElementById("product-image-container");
    imageContainer.style.position = "relative";

    productImage.addEventListener("mouseenter", () => {
        productImage.classList.add("disable-transform");
        zoomLens.style.display = "block";
        zoomResult.style.display = "block";
        zoomResult.style.backgroundImage = `url(${productImage.src})`;
    });

    let mouseX = 0,
        mouseY = 0,
        currentX = 0,
        currentY = 0;

    productImage.addEventListener("mousemove", (e) => {
        const rect = productImage.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    function animateZoom() {
        currentX += (mouseX - currentX) * 0.2;
        currentY += (mouseY - currentY) * 0.2;

        const lensX = currentX - zoomLens.offsetWidth / 2;
        const lensY = currentY - zoomLens.offsetHeight / 2;
        const maxX = productImage.offsetWidth - zoomLens.offsetWidth;
        const maxY = productImage.offsetHeight - zoomLens.offsetHeight;

        zoomLens.style.left = Math.max(0, Math.min(lensX, maxX)) + "px";
        zoomLens.style.top = Math.max(0, Math.min(lensY, maxY)) + "px";

        const zoomX = (currentX / productImage.offsetWidth) * 100;
        const zoomY = (currentY / productImage.offsetHeight) * 100;
        zoomResult.style.backgroundPosition = `${zoomX}% ${zoomY}%`;

        requestAnimationFrame(animateZoom);
    }

    productImage.addEventListener("mouseenter", () => {
        zoomLens.style.display = "block";
        zoomResult.style.display = "block";
        zoomResult.style.backgroundImage = `url(${productImage.src})`;
        zoomResult.style.backgroundSize = "300% 300%";
        requestAnimationFrame(animateZoom);
    });

    productImage.addEventListener("mouseleave", () => {
        productImage.classList.remove("disable-transform");
        zoomLens.style.display = "none";
        zoomResult.style.display = "none";
    });
}

function mostrarLightbox(allImages, startIndex = 0) {
    const lightbox = document.getElementById("lightbox-overlay");
    const lightboxImage = document.getElementById("lightbox-image");
    const counter = document.getElementById("image-counter");
    const dotsContainer = document.getElementById("lightboxIndicators");
    let currentIndex = startIndex;

    function updateLightboxImage(index) {
        currentIndex = index;
        lightboxImage.src = allImages[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${allImages.length}`;
        updateDots();
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = "";

        allImages.forEach((_, index) => {
            const dot = document.createElement("span");
            if (index === currentIndex) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll("span");
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % allImages.length;
        updateLightboxImage(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        updateLightboxImage(currentIndex);
    }

    // Swipe (solo mobile)
    if (window.innerWidth <= 479) {
        let startX = 0;

        lightboxImage.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        lightboxImage.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                showNext();
            } else if (endX - startX > 50) {
                showPrev();
            }
        });
    }

    // Flechas (desktop)
    document.getElementById("lightbox-prev").onclick = showPrev;
    document.getElementById("lightbox-next").onclick = showNext;

    // Cerrar lightbox
    document.querySelector(".lightbox-close").onclick = () => {
        lightbox.classList.remove("visible");
        document.body.classList.remove("lightbox-open");
    };

    createDots();
    updateLightboxImage(currentIndex);
    lightbox.classList.add("visible");
    document.body.classList.add("lightbox-open");
}

function mostrarMiniaturas(allImages, productImage, thumbnailsContainer) {
    const indicator = document.getElementById("carousel-indicator");
    const indicatorsContainer = document.getElementById("carouselIndicators");
    const lightboxDotsContainer = document.getElementById("lightboxIndicators");
    let currentIndex = 0;

    // Función genérica para crear indicadores en un contenedor
    function crearIndicadoresEn(container, cantidad, activeIndex = 0) {
        if (!container) return;

        container.innerHTML = "";
        for (let i = 0; i < cantidad; i++) {
            const dot = document.createElement("span");
            if (i === activeIndex) dot.classList.add("active");

            // En mobile, los puntitos del lightbox serán clicables
            if (container === lightboxDotsContainer && window.innerWidth <= 479) {
                dot.addEventListener("click", () => {
                    updateImage(i);
                });
            }

            container.appendChild(dot);
        }
    }

    // Función genérica para actualizar el punto activo en un contenedor
    function actualizarIndicadoresEn(container, activeIndex) {
        if (!container) return;

        const dots = container.querySelectorAll("span");
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === activeIndex);
        });
    }

    function crearIndicadores() {
        crearIndicadoresEn(indicatorsContainer, allImages.length, 0);
        crearIndicadoresEn(lightboxDotsContainer, allImages.length, 0);
    }

    function actualizarIndicadores() {
        actualizarIndicadoresEn(indicatorsContainer, currentIndex);
        actualizarIndicadoresEn(lightboxDotsContainer, currentIndex);
    }

    function updateImage(index) {
        currentIndex = index;
        productImage.src = allImages[currentIndex];
        productImage.setAttribute("data-index", currentIndex);

        if (indicator) {
            indicator.textContent = `${currentIndex + 1} / ${allImages.length}`;
        }

        if (window.innerWidth > 479) {
            document.querySelectorAll(".thumbnails img").forEach((img, idx) => {
                img.classList.toggle("selected", idx === currentIndex);
            });
        }

        actualizarIndicadores();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        updateImage(currentIndex);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % allImages.length;
        updateImage(currentIndex);
    }

    // Miniaturas (solo en desktop)
    thumbnailsContainer.innerHTML = "";
    if (window.innerWidth > 479) {
        allImages.forEach((imgSrc, index) => {
            const thumb = document.createElement("img");
            thumb.src = imgSrc;
            if (index === 0) thumb.classList.add("selected");

            thumb.addEventListener("click", () => updateImage(index));
            thumb.addEventListener("mouseenter", () => updateImage(index));

            thumbnailsContainer.appendChild(thumb);
        });
    }

    // Swipe (mobile)
    if (window.innerWidth <= 479) {
        let startX = 0;

        productImage.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        productImage.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                showNextImage();
            } else if (endX - startX > 50) {
                showPrevImage();
            }
        });

        // Abrir lightbox al hacer clic en imagen principal
        productImage.addEventListener("click", () => {
            mostrarLightbox(allImages, currentIndex);
        });
    }

    crearIndicadores();
    updateImage(0);
}

function mostrarGaleria(product, galleryContainer) {
    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";
    const imageKeys = ["img01", "img02", "img03", "img04", "img05"];

    imageKeys.forEach((key) => {
        if (product[key]) {
            const imgEl = document.createElement("img");
            imgEl.src = product[key];
            imgEl.alt = product.title;
            imgEl.title = product.title;
            galleryContainer.appendChild(imgEl);
        }
    });

    const warningImg = document.createElement("img");
    warningImg.src =
        "https://github.com/PaulaLemStaFe/GScontroles-SantaFe/blob/master/assets/images/control-warning/CartelAdvertencia.png?raw=true";
    warningImg.alt = "Advertencia sobre la compatibilidad del control remoto";
    warningImg.title = "Advertencia: Asegúrese de que su control coincida con la imagen";
    warningImg.classList.add("warning-image");
    galleryContainer.appendChild(warningImg);
}

function cargarDatosProducto(product) {
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-code").textContent = `Código: ${product.code}`;
    document.getElementById("product-color").textContent = `Color: ${product.color}`;
    document.getElementById("product-soportado1").textContent = product.modelosoportado01;
    document.getElementById("product-soportado2").textContent = product.modelosoportado02;
    document.getElementById("product-soportado3").textContent = product.modelosoportado03;
    document.getElementById("product-soportado4").textContent = product.modelosoportado04;
    document.getElementById("product-soportado5").textContent = product.modelosoportado05;
}

function mostrarProductosSimilares(product, similarProducts, productCategory, productId) {
    const similares = similarProducts.filter(
        (p) =>
            [
                product.modelosoportado01,
                product.modelosoportado02,
                product.modelosoportado03,
                product.modelosoportado04,
                product.modelosoportado05,
            ].includes(p.modelosoportado01) && p.idProduct != productId
    );
    const mostrar = shuffle(similares).slice(0, 6);
    const container = document.getElementById("similar-products");

    if (container) {
        mostrar.forEach((p) => crearProducto(container, p, "img"));

        const viewAllLink = document.getElementById("view-all-link");
        if (similares.length > 6) {
            viewAllLink.href = `https://PaulaLemStaFe.github.io/GScontroles-SantaFe/assets/pages/products/allproducts.html?category=${productCategory}&title=Controles Remotos de ${categoryMap[productCategory]}&idproduct=${productId}`;
        } else {
            viewAllLink.style.display = "none";
        }
    }
}

function actualizarLabelSoportados(product) {
    const modelos = [
        product.modelosoportado01,
        product.modelosoportado02,
        product.modelosoportado03,
        product.modelosoportado04,
        product.modelosoportado05
    ];

    const marcas = modelos.filter((m) => m && m.trim() !== "");
    const label = document.getElementById("soportados-label");

    if (label) {
        label.textContent = marcas.length > 1 ? "Marcas Soportadas:" : "Marca Soportada:";
    }
}

function mostrarDetallesProducto(url, productId) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let product,
                similarProducts,
                productCategory;
            if ((product = data.productscs.find((p) => p.idProduct == productId))) {
                similarProducts = data.productscs;
                productCategory = "productcs";
            } else if ((product = data.productstv.find((p) => p.idProduct == productId))) {
                similarProducts = data.productstv;
                productCategory = "producttv";
            } else if ((product = data.productsaa.find((p) => p.idProduct == productId))) {
                similarProducts = data.productsaa;
                productCategory = "productac";
            } else {
                console.error("Producto no encontrado.");
                return;
            }

            const productImage = document.getElementById("product-image");
            const thumbnailsContainer = document.getElementById("product-thumbnails");
            const galleryContainer = document.getElementById("product-gallery");
            const allImages = [
                product.img01,
                product.img02,
                product.img03,
                product.img04,
                product.img05,
            ]
                .filter(Boolean)
                .concat(
                    "https://github.com/PaulaLemStaFe/GScontroles-SantaFe/blob/master/assets/images/control-warning/CartelAdvertencia.png?raw=true"
                );

            productImage.src = allImages[0];
            updateImageAttributes(productImage, product);

            updateProductDetails(product, productCategory);
            setupZoomFunctionality(productImage);
            mostrarMiniaturas(allImages, productImage, thumbnailsContainer);
            mostrarGaleria(product, galleryContainer);
            cargarDatosProducto(product);
            actualizarLabelSoportados(product);
            mostrarProductosSimilares(product, similarProducts, productCategory, productId);
            activarLightbox(allImages);
        })
        .catch((error) => console.error("Error al leer el archivo db.json:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("idproduct");
    if (!productId) {
        console.error("No se encontró el ID del producto en la URL.");
        return;
    }
    mostrarDetallesProducto(
        "https://PaulaLemStaFe.github.io/GScontroles-SantaFe/db.json",
        productId
    );
});
