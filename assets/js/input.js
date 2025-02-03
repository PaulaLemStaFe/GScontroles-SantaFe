document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('search-modal');
    const buscador = document.querySelector('.input__buscador_modal');
    const iconoBusqueda = document.querySelector('.input_icon_menu');

    iconoBusqueda.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el enlace recargue la página
        modal.classList.add('show'); // Muestra el modal con animación
        buscador.focus(); // Enfoca el campo de búsqueda
    });

    // Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.classList.remove('show'); // Oculta el modal con animación
        }
    });
});
