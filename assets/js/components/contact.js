const contactTemplate = document.createElement('template');

var urlImageLogoHtml = '';
var urlImageFondoHtml = '';
var urlMenuHtml = '';

if (document.title == "GS Controles - Inicio") {
    urlImageLogoHtml = "assets/images/logo-solo/logo-nombre.png";
    urlImageFondoHtml = "assets/images/fondos/fondo-de-logo.jpg";
    urlMenuHtml = "./assets/pages/underconstruction/underconstruction.html";
} else if (document.title == "GS Controles - Productos Todos" || document.title == "GS Controles - Login" || document.title == "GS Controles - Producto Detalles") {
    urlMenuHtml = "../underconstruction/underconstruction.html";
    urlImageLogoHtml = "../../images/logo-solo/logo-nombre.png";
    urlImageFondoHtml = "../../images/fondos/fondo-de-logo.jpg";
} else if (document.title == "GS Controles - Producto Detalles") {
    urlMenuHtml = "../../underconstruction/underconstruction.html";
}

contactTemplate.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <section class="contact">
        <h2 id="contact">Contacto</h2>
        <div class="contact_content">
            <!-- form -->
            <div class="contact_form">
                <div class="contact_form__title">
                    <h6 class="title">Escribinos mediante este formulario</h6>
                </div>

                <form class="contact_form_form" id="contact_form_form">
                    <div class="contact_form_area input-container">
                        <input name="name" type="text" class="contact_form__input input-padron" id="name" required minlength="10" maxlength="40" data-tipo="name" placeholder="Nombre Y Apellido">
                        <span class="mensaje-error">Este campo no es válido</span>
                    </div>
                    <div class="contact_form_area input-container">
                        <input name="email" type="email" class="contact_form__input input-padron" id="email" required minlength="4" maxlength="40" data-tipo="name" placeholder="Correo Electrónico">
                        <span class="mensaje-error">Este campo no es válido</span>
                    </div>
                    <div class="contact_form_area input-container">
                        <input name="asunt" type="text" class="contact_form__input input-padron" id="asunt" required minlength="10" maxlength="40" data-tipo="name" placeholder="Asunto">
                        <span class="mensaje-error">Este campo no es válido</span>
                    </div>
    
                    <div class="contact_form__menssage input-container">
                        <textarea name="message" id="message" class="menssage input-padron" required maxlength="120" data-tipo="message" placeholder="Escribe tu mensaje"></textarea>
                        <span class="mensaje-error">Este campo no es válido</span>
                    </div>
    
                    <input type="submit" value="Enviar Mensaje" class="contact_form__button send_message__button enviar" alt="Enviar Mensaje" title="Enviar Mensaje">
                </form>
            </div>

            <!-- menu -->
            <div class="contact_menu">
                <!-- logo -->
                <div class="contact_logo">
                    <img class="contact_logo_img" alt="GS Controles" title="GS Controles">
                </div>
                <ul class="menu">
                    <li class="menu_item">
                        <a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Mándenos un WhatsApp" title="Mándenos Un WhatsApp">
                            <i class="bi bi-whatsapp"></i> +54 9 3426138796
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Llámenos" title="Llámenos">
                            <i class="bi bi-telephone"></i> +54 9 3426138796
                        </a>
                    </li>
                    <li class="menu_item" alt="Nuestra Dirección" title="Nuestra Dirección">
                        <i class="bi bi-geo-alt"></i> Matheu 2420 - Santa Fe Capital - Argentina
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Mándenos un E-Mail" title="Mándenos Un E-Mail">
                            <i class="bi bi-envelope"></i> gscontroles@gmail.com
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Nuestro Facebook" title="Nuestro Facebook">
                            <i class="bi bi-facebook"></i> @gscontroles
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Nuestro Instagram" title="Nuestro Instagram">
                            <i class="bi bi-instagram"></i> @gs.controles
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <div class="map" id="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.4584765073637!2d-60.69161122467499!3d-31.593894704854414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5074688e26a7b%3A0x7cf67ae3be21f06!2sMatheu%202420%2C%20S3004%20Santa%20Fe%20de%20la%20Vera%20Cruz%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1738917695951!5m2!1ses-419!2sar" 
        //class="map_iframe" id="map_iframe" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
`;

class Contact extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        const reset = document.querySelector('link[href*="reset"]');
        const logo = document.querySelector('link[href*="logo"]');
        const inputs = document.querySelector('link[href*="inputs"]');
        const buttons = document.querySelector('link[href*="buttons"]');
        const responsive = document.querySelector('link[href*="responsive"]');
        const shadowRoot = this.attachShadow({ mode: 'open' });

        if (fontAwesome) {
            shadowRoot.appendChild(fontAwesome.cloneNode());
        }

        if (reset) {
            shadowRoot.appendChild(reset.cloneNode());
        }

        if (logo) {
            shadowRoot.appendChild(logo.cloneNode());
        }

        if (inputs) {
            shadowRoot.appendChild(inputs.cloneNode());
        }

        if (buttons) {
            shadowRoot.appendChild(buttons.cloneNode());
        }

        if (responsive) {
            shadowRoot.appendChild(responsive.cloneNode());
        }


        shadowRoot.appendChild(contactTemplate.content.cloneNode(true));

        const style = document.createElement('style');
        style.textContent = `
            :root {
                --color-primary: #F6F7D3;
                --color-secondary: #e6e7cc;
                --color-tertiary: #697565;
                --color-fourth: #3C3D37;
                --color-fifth: #1E201E;
                font-family: "Capriola", serif;
                line-height: 1rem;
                scroll-behavior: smooth;
            }
                
            .contact {
                background-image: url(${urlImageFondoHtml});
                color: var(--color-primary);
                opacity: 90%;
                padding: 2.5rem 0;
            }

            h2 {
                align-items: center;
                display: flex;
                flex-flow: column;
                justify-content: center;
                font-size: 2.5rem;
                font-variant: small-caps;
                font-weight: bold; /* Para hacer el texto negrita */
                margin-bottom: 1rem;
                text-align: center;
            }
            
            .contact_content {
                align-items: center;
                display: flex;
                gap: 7rem;
                justify-content: center;
                margin: 0 auto;
                width: 80%;
            }
            
            .contact_form_form, .contact_form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .contact_form__title {
                font-weight: 700;
            }
            
            .contact_form_area {
                display: flex;
                flex-direction: column;
            }

            input {
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
            }
            
            .contact_form__label {
                background-color: var(--color-secondary);
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                font-size: 0.8rem;
                font-weight: 300;
                padding: 0.5rem 0.5rem 0 0.5rem;
            }
            
            .contact_form__input {
                background-color: var(--color-secondary);
                border: none;
                border-bottom: 1px solid var(--color-fourth);
                font-family: "Capriola", serif;
                font-size: 0.9rem;
                outline: none;
                padding: 0.5rem;
                width: 35rem;
            }
            
            .contact_form__input:focus, .menssage:focus {
                border-color: var(--color-fourth);
            }
            
            .menssage {
                background-color: var(--color-secondary);
                border: none;
                border-bottom: 1px solid var(--color-fourth);
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                font-family: "Capriola", serif;
                font-size: 0.9rem;
                height: 4rem;
                outline: none;
                padding: 0.5rem;
                resize: none;
                width: 35rem;
            }
            
            .mensaje-error {
                display: none;
            }
            
            .input-container-invalid {
                margin-bottom: 0.5rem;
            }
            
            .input-container-invalid .input-padron {
                border-bottom: 2px solid #df2525;
                border-radius: 7px;
                margin: 0 0 5px;
            }
            
            .input-container-invalid .input-label {
                color: #df2525;
            }
            
            .input-container-invalid .mensaje-error {
                color: #df2525;
                display: block;
            }
            
            .contact_form__button {
                background-color: var(--color-tertiary);
                border: none;
                border-radius: 0.5rem;
                color: var(--color-primary);
                cursor: pointer;
                font-weight: bold;
                margin-right: auto;
                padding: 1rem 2rem;
                transition: all 1s;
            }
            
            .contact_form__button:hover {
                background-color: var(--color-fourth);
                box-shadow: 2px 2px 18px var(--color-tertiary);
            }
            
            .send_message__button {
                color: var(--color-primary);
                text-decoration: none;
            }
            
            .contact_logo_img {
                display: flex;
                content: url(${urlImageLogoHtml});
                height: 45%;
                margin-bottom: 1rem;
                object-fit: cover;
                width: 45%;
            }
            
            .menu {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }
            
            .menu_item {
                font-size: 1.1rem;
                transition: all 1s;
            }
            
            .menu_item:hover {
                color: var(--color-primary);
                transform: scale(1.1);
            }
            
            .menu_link {
                color: var(--color-primary);
                text-decoration: none;
                transition: all 1s;
            }
            
            .menu_link:hover {
                color: var(--color-primary);
            }
            
            .bi {
                font-size: 1.3rem;
                font-weight: bold;
                padding: 0.5rem;
            }
            
            
            
            @media (min-width:451px) and (max-width:768px) {
            
                .contact {
                    margin-top: 2.5rem;
                    padding: 2rem 0;
                }
            
                .contact_content {
                    align-items: center;
                    display: flex;
                    flex-flow: column wrap;
                    gap: 2rem;
                    justify-content: center;
                    margin: 0 auto;
                    max-width: 1920px;
                    width: 90%;
                }
            
                .contact_logo_img, .contact_menu {
                    display: flex;
                    flex-direction: column;
                }
            
                .menu {
                    text-align: center;
                }
            
                .contact_form {
                    width: 100%;
                }
            
                .contact_form_area {
                    width: 100%;
                }
            
                .contact_form__input {
                    border: none;
                    font-size: 1rem;
                    outline: none;
                    padding: 0.5rem;
                    width: 97%;
                }
                
                .menssage {
                    border: none;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    font-size: 1rem;
                    outline: none;
                    padding: 0.5rem;
                    resize: none;
                    width: 97%;
                }
            
                .contact_form__button {
                    cursor: pointer;
                    margin-bottom: 1rem;
                    margin-right: auto;
                    padding: 1rem 3rem;
                }
            
            }
            
            
            
            
            @media (max-width: 450px) {
            
                .contact {
                    margin-top: 2.5rem;
                    padding: 2rem 0;
                }
            
                .contact_content {
                    align-items: center;
                    display: flex;
                    flex-flow: column wrap;
                    gap: 2rem;
                    justify-content: center;
                    margin: 0 auto;
                    max-width: 1920px;
                    width: 90%;
                }
            
                .contact_logo {
                    align-items: center;
                    justify-content: center;
                    width: 35%;
                }
            
                .contact_logo_img {
                    margin-right: 0;
                }
            
                .contact_logo_img, .contact_menu {
                    display: flex;
                    flex-direction: column;
                }
            
                .menu {
                    text-align: center;
                }
            
                .contact_form {
                    width: 100%;
                }
            
                .contact_form_area {
                    width: 100%;
                }
            
                .contact_form__input {
                    border: none;
                    font-family: Raleway, sans-serif;
                    font-size: 1rem;
                    outline: none;
                    padding: 0.5rem;
                    width: 97%;
                }
                
                .menssage {
                    border: none;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    font-size: 1rem;
                    outline: none;
                    padding: 0.5rem;
                    resize:none;
                    width: 97%;
                }
            
                .contact_form__button {
                    cursor:pointer;
                    padding: 1rem 3rem;
                    margin-bottom: 1rem;
                    margin-right: auto;
                }
            
            }
        `;
        shadowRoot.appendChild(style);

        const form = shadowRoot.querySelector('#contact_form_form');
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar que el formulario se envíe
                window.location.href = urlMenuHtml; // Redirigir a la página "En Construcción"
            });
        }

    }
}


customElements.define('contact-component', Contact);