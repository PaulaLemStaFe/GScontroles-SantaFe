//app.js

document.addEventListener("DOMContentLoaded", () => {
    // Lógica de autenticación del administrador
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch('https://PaulaLemStaFe.github.io/GScontroles-SantaFe/db.json')
                .then(response => response.json())
                .then(data => {
                    const user = data.user.find(user => user.email === email && user.password === password);
                    if (user) {
                        localStorage.setItem('isAdmin', 'true');
                        window.location.href = "https://PaulaLemStaFe.github.io/GScontroles-SantaFe/assets/pages/editionproducts/editionproducts.html";
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

    // Código para mostrar/ocultar el botón de scroll-top
    const scrollTopBtn = document.getElementById('scroll-top');

    function toggleScrollTopButton() {
        if (window.scrollY === 0) {
            scrollTopBtn.style.display = 'none';  // Ocultar el botón si estamos al principio
        } else {
            scrollTopBtn.style.display = 'block'; // Mostrar el botón si no estamos al principio
        }
    }

    // Llamamos a la función al cargar la página
    window.addEventListener('load', toggleScrollTopButton);

    // Llamamos a la función cada vez que se hace scroll
    window.addEventListener('scroll', toggleScrollTopButton);
});

const tipoDeErrores = [
    'patternMismatch',
    'valueMissing',
    'tooShort',
    'typeMismatch'
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
    product_category: {
        valueMissing: "El campo Categoría del Producto no puede estar vacío",
        tooShort: "Debe tener al menos 4 caracteres"
    },
    product_code: {
        valueMissing: "El campo Código del Producto no puede estar vacío",
        tooShort: "Debe tener al menos 6 caracteres"
    },
    product_color: {
        valueMissing: "El campo Color del Producto no puede estar vacío",
        tooShort: "Debe tener al menos 4 caracteres"
    },
    product_soported_01: {
        valueMissing: "El campo Marca Soportada no puede estar vacío",
        tooShort: "Debe tener al menos 3 caracteres"
    },
    product_soported_02: {
        valueMissing: "El campo Marca Soportada no puede estar vacío",
        tooShort: "Debe tener al menos 3 caracteres"
    },
    product_soported_03: {
        valueMissing: "El campo Marca Soportada no puede estar vacío",
        tooShort: "Debe tener al menos 3 caracteres"
    },
    product_soported_04: {
        valueMissing: "El campo Marca Soportada no puede estar vacío",
        tooShort: "Debe tener al menos 3 caracteres"
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