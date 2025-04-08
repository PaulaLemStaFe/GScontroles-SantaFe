function activarLightbox(images) {
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const imageCounter = document.getElementById("image-counter");
    const dotsContainer = document.getElementById("lightboxIndicators");

    let currentIndex = 0;
    const hasMouse = window.matchMedia('(pointer: fine)').matches;

    function updateLightboxImage(index) {
        lightboxImage.classList.add("fade-out");
        currentIndex = index;

        setTimeout(() => {
            lightboxImage.src = images[currentIndex];
            imageCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            lightboxImage.classList.remove("fade-out");
            if (!hasMouse) updateDots();
        }, 200);
    }

    function createDots() {
        if (!dotsContainer || hasMouse) return;
        dotsContainer.innerHTML = "";
        images.forEach((_, index) => {
            const dot = document.createElement("span");
            if (index === currentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => updateLightboxImage(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        if (!dotsContainer || hasMouse) return;
        const dots = dotsContainer.querySelectorAll("span");
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
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

    // Flechas visibles solo si hay mouse
    if (hasMouse) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    } else {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }

    // Swipe solo si NO hay mouse
    if (!hasMouse) {
        let startX = 0;
        lightboxImage.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        lightboxImage.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                showNextImage();
            } else if (endX - startX > 50) {
                showPrevImage();
            }
        });
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

    createDots();
}
