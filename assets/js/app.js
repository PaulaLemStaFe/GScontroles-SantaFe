//app.js

document.addEventListener("DOMContentLoaded", () => {
    // Validación de inputs en el DOM principal
    const inputs = document.querySelectorAll(".input-padron");
    
    inputs.forEach(input => {
        input.addEventListener('blur', event => valida(event.target));
    });

    // Validación de inputs dentro del Shadow DOM del contact-component
    const contact = document.querySelector('contact-component');
    if (contact) {
        const shadowRoot = contact.shadowRoot;
        if (shadowRoot) {
            const inputsContact = shadowRoot.querySelectorAll(".input-padron");
            inputsContact.forEach(input => {
                input.addEventListener('blur', event => valida(event.target));
            });

            // Formulario dentro del Shadow DOM
            const form = shadowRoot.querySelector('#contact_form_form');
            if (form) {
                form.addEventListener('submit', function(event) {
                    // Validar todos los inputs del formulario
                    const inputsValidos = [...shadowRoot.querySelectorAll(".input-padron")].every(input => input.checkValidity());
                    if (!inputsValidos) {
                        event.preventDefault(); // Bloquear envío si hay errores
                        // Mostrar mensajes de error
                        shadowRoot.querySelectorAll(".input-padron").forEach(input => valida(input));
                    }
                    // Si todo es válido, el formulario se envía automáticamente a Netlify Forms
                });
            }
        }
    }

    // Código para mostrar/ocultar el botón de scroll-top
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

// Tipos de errores
const tipoDeErrores = [
    'patternMismatch',
    'valueMissing',
    'tooShort',
    'typeMismatch'
];

// Mensajes de error
const mensajesDeError = {
    name: {
        valueMissing: "Debes completar el campo Nombre para poder continuar",
        tooShort: "Debe tener al menos 10 caracteres"
    },
    email: {
        valueMissing: "El campo E-mail no puede estar vacío",
        typeMismatch: "El E-mail no es válido",
    },
    asunt: {
        valueMissing: "Debes completar el campo Asunto para poder continuar",
        tooShort: "Debe tener al menos 10 caracteres"
    },
    message: {
        valueMissing: "Debes completar el campo Mensaje para poder continuar"
    },
};

// Función de validación de un input
function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (input.validity.valid && input.checkValidity()) {
        input.parentElement.classList.remove("input-container-invalid");
        input.parentElement.querySelector(".mensaje-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container-invalid");
        input.parentElement.querySelector(".mensaje-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

// Función que retorna el mensaje de error correspondiente
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error] || "Este campo no es válido";
        }
    });
    return mensaje;
}
