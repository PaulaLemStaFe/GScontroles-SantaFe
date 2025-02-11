//app.js

document.addEventListener("DOMContentLoaded", () => {
    // Lógica de autenticación del administrador
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch('../../../../db.json')
                .then(response => response.json())
                .then(data => {
                    const user = data.user.find(user => user.email === email && user.password === password);
                    if (user) {
                        localStorage.setItem('isAdmin', 'true');
                        window.location.href = "/assets/pages/editionproducts/editionproducts.html";
                    } else {
                        alert('Credenciales incorrectas');
                    }
                })
                .catch(error => console.error('Error al leer el archivo db.json:', error));
        });
    }

    const inputs = document.querySelectorAll(".input-padron");
    const contact = document.querySelector('contact-component');
    
    if (contact) {
        const shadowRoot = contact.shadowRoot;
        
        if (shadowRoot) {
            const inputsContact = shadowRoot.querySelectorAll(".input-padron");
            
            inputsContact.forEach(input => {
                input.addEventListener('blur', event => valida(event.target));
            });
        }
    }
    
    inputs.forEach(input => {
        input.addEventListener('blur', event => valida(event.target));
    });

    // Comprobar si el administrador está autenticado
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // Actualizar productos si es administrador
    if (isAdmin) {
        const container = document.getElementById("productos");
        if (container) {
            fetch('../../../../db.json')
                .then(response => response.json())
                .then(data => {
                    const productos = {
                        producttv: data.productstv,
                        productac: data.productsaa
                    };
                    [...productos.producttv, ...productos.productac].forEach(producto => {
                        crearProducto(container, producto, "img", isAdmin);
                    });
                })
                .catch(error => console.error('Error al leer el archivo db.json:', error));
        }
    }
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
        patternMismatch: "Al menos 6 caracteres, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    // add products validation
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
    
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}