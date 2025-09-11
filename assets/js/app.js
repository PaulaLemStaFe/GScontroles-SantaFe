// app.js
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar/ocultar el botón de scroll-top
    const scrollTopBtn = document.getElementById('scroll-top');

    function toggleScrollTopButton() {
        if (!scrollTopBtn) return;
        if (window.scrollY === 0) {
            scrollTopBtn.style.display = 'none';
        } else {
            scrollTopBtn.style.display = 'block';
        }
    }

    window.addEventListener('load', toggleScrollTopButton);
    window.addEventListener('scroll', toggleScrollTopButton);
});
