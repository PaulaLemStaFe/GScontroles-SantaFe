function activarLightbox(imageUrls) {
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const counter = document.getElementById("image-counter");

    let currentIndex = 0;

    function mostrarImagen(index) {
        if (index < 0) index = imageUrls.length - 1;
        if (index >= imageUrls.length) index = 0;
        currentIndex = index;
        lightboxImage.src = imageUrls[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
    }

    function abrir(index) {
        mostrarImagen(index);
        overlay.classList.remove("hidden");
        document.body.classList.add("lightbox-open");
    }

    function cerrar() {
        overlay.classList.add("hidden");
        document.body.classList.remove("lightbox-open");
    }

    closeBtn.addEventListener("click", cerrar);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) cerrar();
    });

    prevBtn.addEventListener("click", () => mostrarImagen(currentIndex - 1));
    nextBtn.addEventListener("click", () => mostrarImagen(currentIndex + 1));

    const productImage = document.getElementById("product-image");
    productImage.style.cursor = "zoom-in";
    productImage.addEventListener("click", () => abrir(0));

    const scrollHandler = () => {
        cerrar();
        window.removeEventListener("scroll", scrollHandler);
    };
    window.addEventListener("scroll", scrollHandler);
}
