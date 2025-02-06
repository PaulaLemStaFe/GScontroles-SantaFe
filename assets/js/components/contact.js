const contactTemplate = document.createElement('template');

var urlImageLogoHtml = '';
var urlImageFondoHtml = '';
var urlMenuHtml = '';

if (document.title == "GS Controles - Inicio") {
    urlImageLogoHtml = "assets/images/logo-solo/logo-nombre.png";
    urlImageFondoHtml = "assets/images/fondos/fondo-de-logo.jpg";
    urlMenuHtml = "./assets/pages/underconstruction/underconstruction.html";
} else if (document.title == "GS Controles - Productos Todos" | document.title == "GS Controles - Login" | document.title == "GS Controles - Producto Detalles") {
    urlMenuHtml = "../underconstruction/underconstruction.html";
    urlImageLogoHtml = "../../images/logo-solo/logo-nombre.png";
    urlImageFondoHtml = "../../images/fondos/fondo-de-logo.jpg";
} else if (document.title == "GS Controles - Producto Detalles") {
    urlMenuHtml = "../../underconstruction/underconstruction.html";
}

contactTemplate.innerHTML = `
    <style>

            :root {
                --color-primary: #F6F7D3;
                --color-secondary: #697565;
                --color-tertiary: #3C3D37;
                --color-fourth: #1E201E;
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
                display: flex;
                gap: 7rem;
                margin: 0 auto;
                width: 80%;
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
            
            .contact_form {
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
                background-color: #e6e7cc;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                font-size: 0.8rem;
                font-weight: 300;
                padding: 0.5rem 0.5rem 0 0.5rem;
            }
            
            .contact_form__input {
                background-color: #e6e7cc;
                border: none;
                border-bottom: 1px solid var(--color-tertiary);
                font-family: Raleway, sans-serif;
                font-size: 1rem;
                outline: none;
                padding: 0.5rem;
                width: 35rem;
            }
            
            .contact_form__input:focus, .menssage:focus {
                border-color: var(--color-secondary);
            }
            
            .menssage {
                background-color: #e6e7cc;
                border: none;
                border-bottom: 1px solid var(--color-tertiary);
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                font-family: Raleway, sans-serif;
                font-size: 1rem;
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
                background-color: var(--color-secondary);
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
                background-color: var(--color-tertiary);
                box-shadow: 2px 2px 18px var(--color-secondary);
            }
            
            .send_message__button {
                color:#FFFFFF;
                text-decoration: none;
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
    </style>




    <section class="contact">
        <h2>Contacto</h2>
        <div class="contact_content">
            <!-- form -->
            <div class="contact_form">
                <div class="contact_form__title">
                    <h6 class="title">Escribinos mediante este formulario</h6>
                </div>

                <form class="contact_form">
                    <div class="contact_form_area input-container">
                        <input name="name" type="text" class="contact_form__input input-padron" id="name" required minlength="4" maxlength="40" data-tipo="name" placeholder="Nombre Y Apellido">
                        <span class="mensaje-error">Este campo no es válido</span>
                    </div>
                    <div class="contact_form_area input-container">
                        <input name="email" type="email" class="contact_form__input input-padron" id="name" required minlength="4" maxlength="40" data-tipo="name" placeholder="Correo Electrónico">
                        <span class="mensaje-error">Este campo no es válido</span>
                    </div>
                    <div class="contact_form_area input-container">
                        <input name="asunt" type="text" class="contact_form__input input-padron" id="name" required minlength="4" maxlength="40" data-tipo="name" placeholder="Asunto">
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
                    <li class="menu_item"><a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Mándenos un WhatsApp" title="Mándenos Un WhatsApp">+54 9 3426138796</a></li>
                    <li class="menu_item"><a class="menu_link" href="tel:3426138796" rel="noopener noreferrer" alt="Llámenos" title="Llámenos">+54 9 3426138796</a></li>
                    <li class="menu_item">Matheu 2420 - Santa Fe - Argentina</li>
                    <li class="menu_item"><a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Mándenos un E-Mail" title="Mándenos Un E-Mail">gscontroles@gmail.com</a></li>
                    <li class="menu_item"><a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Nuestro Facebook" title="Nuestro Facebook">@gscontroles</a></li>
                    <li class="menu_item"><a class="menu_link" href="${urlMenuHtml}" rel="noopener noreferrer" alt="Nuestro Instagram" title="Nuestro Instagram">@gs.controles</a></li>
                </ul>
            </div>
        </div>
    </section>
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


        shadowRoot.appendChild(contactTemplate.content);
        // console.log(this.shadowRoot.querySelector('.input'));
        // console.log(this);

    }
}

customElements.define('contact-component', Contact);