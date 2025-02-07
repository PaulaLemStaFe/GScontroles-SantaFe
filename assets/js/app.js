document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".input-padron");
    
    const contact = document.querySelector('contact-component');
    const shadowRoot = contact.shadowRoot;

    const inputsContact = shadowRoot.querySelectorAll(".input-padron");

    inputs.forEach(input => {
        input.addEventListener('blur', (event) => {
            valida(event.target);
        });
    });

    inputsContact.forEach(input => {
        input.addEventListener('blur', (event) => {
            valida(event.target);
        });
    });
});

const tipoDeErrores = [
    'patternMismatch',
    'valueMissing',
    'tooShort',
    'typeMismatch' // Corregir el error tipográfico de 'typeMissmatch' a 'typeMismatch'
];

const mensajesDeError = {
    // contact form validation
    name: {
        valueMissing: "Debes completar el campo Nombre para poder continuar",
        tooShort: "Debe tener al menos 4 caracteres"
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

    // login form validation
    password: {
        valueMissing: "El campo Contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },

    // add products validatiion
    img: {
        valueMissing: "Debes seleccionar al menos una imagen",
    },
    product_name: {
        valueMissing: "El campo Nombre del Producto no puede estar vacío",
    },
    code: {
        valueMissing: "El campo Código no puede estar vacío",
        patternMismatch: "El formato requerido es GS 999 (según corresponda) y no puede haber un cero (0) solo delante del número",
    },
    description: {
        valueMissing: "El campo Descripción no puede estar vacío"
    }
};

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

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";

    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}
