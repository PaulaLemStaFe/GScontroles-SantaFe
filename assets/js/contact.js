// contact.js
// Script dedicado a la validación del formulario de contacto en index.html

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact_form_form");
    const toast = document.getElementById("toast");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Bloqueamos envío normal

            // Verificar que todos los inputs con la clase .input-padron sean válidos
            const inputsValidos = [...form.querySelectorAll(".input-padron")].every(input => input.checkValidity());

            if (!inputsValidos) {
                mostrarErrores(form);
                return; // Si hay errores, no enviamos el formulario
            }
            // Si todo es válido, Netlify recibe el formulario automáticamente

            // Crear objeto FormData para enviar a Netlify
            const formData = new FormData(form);

            fetch("/", {
                method: "POST",
                body: formData
            })
            .then(() => {
                form.reset(); // limpiar formulario
                mostrarToast(toast, "✅ Tu mensaje fue enviado con éxito");
            })
            .catch(() => {
                mostrarToast(toast, "❌ Hubo un error. Inténtalo de nuevo.");
            });
        });

        // Validar cada campo al perder el foco
        const inputs = form.querySelectorAll(".input-padron");
        inputs.forEach(input => {
            input.addEventListener("blur", () => valida(input));
        });
    }
});

// Mostrar toast flotante
function mostrarToast(toast, mensaje) {
    toast.textContent = mensaje;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// Lista de errores que queremos capturar
const tipoDeErrores = [
    "patternMismatch",
    "valueMissing",
    "tooShort",
    "typeMismatch"
];

// Mensajes personalizados por cada campo
const mensajesDeError = {
    name: {
        valueMissing: "Debes completar el campo Nombre para poder continuar",
        tooShort: "Debe tener al menos 10 caracteres"
    },
    email: {
        valueMissing: "El campo E-mail no puede estar vacío",
        typeMismatch: "El E-mail no es válido"
    },
    asunt: {
        valueMissing: "Debes completar el campo Asunto para poder continuar",
        tooShort: "Debe tener al menos 10 caracteres"
    },
    message: {
        valueMissing: "Debes completar el campo Mensaje para poder continuar"
    }
};

// Función que valida un input individual
function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if (input.validity.valid && input.checkValidity()) {
        input.parentElement.classList.remove("input-container-invalid");
        input.parentElement.querySelector(".mensaje-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container-invalid");
        input.parentElement.querySelector(".mensaje-error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
    }
}

// Función para obtener el mensaje adecuado
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";

    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

// Recorre todos los campos y fuerza la validación
function mostrarErrores(form) {
    const inputs = form.querySelectorAll(".input-padron");
    inputs.forEach(input => valida(input));
}
