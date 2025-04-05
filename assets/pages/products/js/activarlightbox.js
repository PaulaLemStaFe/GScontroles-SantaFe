function activarLightbox(images) {
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const imageCounter = document.getElementById("image-counter");

    let currentIndex = 0;

    function updateLightboxImage(index) {
        lightboxImage.classList.add("fade-out");
    
        setTimeout(() => {
            lightboxImage.src = images[index];
            imageCounter.textContent = `${index + 1} / ${images.length}`;
            lightboxImage.classList.remove("fade-out");
        }, 200); // 200 ms tiene que coincidir con la duración del CSS
    }

    function showLightbox(index) {
        currentIndex = index;
        updateLightboxImage(currentIndex);
        overlay.classList.add("visible");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        overlay.classList.remove("visible");
        document.body.style.overflow = "";
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage(currentIndex);
    }

    // Clicks
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);
    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeLightbox();
    });

    // Teclas
    document.addEventListener("keydown", (e) => {
        if (!overlay.classList.contains("visible")) return;
    
        switch (e.key) {
            case "ArrowRight":
                showNextImage();
                break;
            case "ArrowLeft":
                showPrevImage();
                break;
            case "Escape":
                closeLightbox();
                break;
        }
    });

    // Clics en la galería (miniaturas al final del producto)
    const galleryImages = document.querySelectorAll("#product-gallery img");
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            showLightbox(index);
        });
    });

    // Clic en la imagen principal
    const productImage = document.getElementById("product-image");
    productImage.addEventListener("click", () => {
        const currentSrc = productImage.src;
        const index = images.findIndex((img) => currentSrc.includes(img.split("/").pop()));
        showLightbox(index !== -1 ? index : 0);
    });
}