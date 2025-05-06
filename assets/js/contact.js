const contactTemplate = document.createElement('template');

var urlImageLogoHtml = 'assets/images/logo-solo/logo-nombre.png';
var urlImageFondoHtml = 'assets/images/fondos/fondo-de-logo.jpg';
var urlConstructionHtml = 'underconstruction.html';

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
                        <input name="email" type="email" class="contact_form__input input-padron" id="email" required minlength="4" maxlength="40" data-tipo="email" placeholder="Correo Electrónico">
                        <span class="mensaje-error">Este campo no es válido</span>
                    </div>
                    <div class="contact_form_area input-container">
                        <input name="asunt" type="text" class="contact_form__input input-padron" id="asunt" required minlength="10" maxlength="40" data-tipo="asunt" placeholder="Asunto">
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
                        <a class="menu_link" href="${urlConstructionHtml}" rel="noopener noreferrer" alt="Mándenos un WhatsApp" title="Mándenos Un WhatsApp">
                            <i class="bi bi-whatsapp"></i> +54 9 3425455448
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="${urlConstructionHtml}" rel="noopener noreferrer" alt="Llámenos" title="Llámenos">
                            <i class="bi bi-telephone"></i> +54 9 3425455448
                        </a>
                    </li>
                    <li class="menu_item" alt="Nuestra Dirección" title="Nuestra Dirección">
                        <i class="bi bi-geo-alt"></i> Matheu 2420 - Santa Fe Capital - Argentina
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="${urlConstructionHtml}" rel="noopener noreferrer" alt="Mándenos un E-Mail" title="Mándenos Un E-Mail">
                            <i class="bi bi-envelope"></i> gscontrolesarg@gmail.com
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="https://www.facebook.com/profile.php?id=61574031543208" rel="noopener noreferrer" alt="Nuestro Facebook" title="Nuestro Facebook">
                            <i class="bi bi-facebook"></i> @GScontroles SantaFe
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link" href="https://www.instagram.com/gscontrolessantafe/" rel="noopener noreferrer" alt="Nuestro Instagram" title="Nuestro Instagram">
                            <i class="bi bi-instagram"></i> @gscontrolessantafe
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

        [fontAwesome, reset, logo, inputs, buttons, responsive].forEach(link => {
            if (link) {
                shadowRoot.appendChild(link.cloneNode());
            }
        });

        shadowRoot.appendChild(contactTemplate.content.cloneNode(true));

        const style = document.createElement('style');
        style.textContent = `
            :root {
                --color-primary: #FFFFFF;
                --color-secondary: #B7B9B4;
                --color-tertiary: #697565;
                --color-fourth: #3C3D37;
                --color-fifth: #1E201E;
                font-family: "Capriola", serif;
                line-height: 1rem;
                scroll-behavior: smooth;
            }
            h2 {
                align-items: center;
                display: flex;
                flex-flow: column;
                font-size: 2.5rem;
                font-variant: small-caps;
                font-weight: bold;
                justify-content: center;
                margin-bottom: 1rem;
                text-align: center;
                text-shadow: 1px 1px 2px var(--color-secondary);
            }
            input {
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
            }
            .bi {
                font-size: 1.3rem;
                font-weight: bold;
                padding: 0.5rem;
            }
            .contact {
                background-image: url(${urlImageFondoHtml});
                background-position: center center;
                color: var(--color-primary);
                opacity: 85%;
                padding: 2.5rem 0;
                text-shadow: 1px 1px 2px var(--color-secondary);
            }
            .contact_content {
                align-items: center;
                display: flex;
                gap: 7rem;
                justify-content: center;
                margin: 0 auto;
                width: 80%;
            }
            .contact_form_area {
                display: flex;
                flex-direction: column;
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
            .contact_form_form, .contact_form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                text-shadow: 1px 1px 2px var(--color-fourth);
            }
            .contact_form__input, .menssage {
                background-color: #E0E0E0;
                border: none;
                border-bottom: 1px solid var(--color-fourth);
                font-family: "Capriola", serif;
                font-size: 0.9rem;
                font-weight: normal;
                outline: none;
                padding: 0.5rem;
                width: 35rem;
            }
            .contact_form__input:focus, .menssage:focus, .contact_form__input:valid, .menssage:valid, 
            .contact_form__input:not, .menssage:not {
                background-color: var(--color-secondary) !important;
                border-color: var(--color-fourth) !important;
            }
            .contact_form__label {
                background-color: var(--color-secondary);
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                font-size: 0.8rem;
                font-weight: 300;
                padding: 0.5rem 0.5rem 0 0.5rem;
            }
            .contact_form__title {
                font-weight: 700;
                text-shadow: 1px 1px 2px var(--color-secondary);
            }
            .contact_logo_img {
                display: flex;
                content: url(${urlImageLogoHtml});
                height: 45%;
                margin-bottom: 1rem;
                object-fit: cover;
                width: 45%;
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
            .menssage {
                height: 4rem;
                resize: none;
            }
            .mensaje-error {
                display: none;
            }
            .menu {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                text-shadow: 1px 1px 2px var(--color-secondary);
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
            .send_message__button {
                color: var(--color-primary);
                text-decoration: none;
            }



            /* Media queries para dispositivos medianos y pequeños */
            @media (max-width: 479px) {
                h2 {
                    font-size: 1.4rem;
                }
                .contact {
                    background-repeat: no-repeat;
                    background-size: cover;
                    padding: 1rem 0;
                }
                .contact_content {
                    align-items: center;
                    flex-direction: column;
                    gap: 1.5rem;
                    justify-content: center;
                    width: 80%;
                }
                .contact_form__button {
                    margin: 0;
                    padding: 0.5rem 1rem;
                }
                .contact_form__input, .menssage {
                    font-size: 0.8rem;
                    width: 25rem;
                }
                .contact_form__title h6 {
                    font-size: 1rem;
                    font-weight: normal;
                    text-align: center;
                }
                .contact_form_form, .contact_form {
                    align-items: center;
                    gap: 1rem;
                    justify-content: center;
                }
                .contact_logo {
                    align-content: center;
                    display: flex;
                    justify-content: center;
                    margin: auto;
                    width: 55%;
                }
                .contact_logo_img {
                    width: 60%;
                }
                .input-container-invalid .mensaje-error {
                    font-size: 0.8rem;
                }
                .map_iframe {
                    display: none;
                }
                .menu {
                    align-items: center;
                    gap: 0.8rem;
                    justify-content: center;
                    text-align: center;
                }
                .menu_item {
                    font-size: 0.8rem;
                    line-height: 1.3rem;
                    text-align: center;
                }
            }


            @media (min-width:480px) and (max-width:767px) {
                h2 {
                    font-size: 1.5rem;
                }
                .contact {
                    background-repeat: no-repeat;
                    background-size: cover;
                    padding: 1rem 0;
                }
                .contact_content {
                    align-items: center;
                    flex-direction: column;
                    gap: 1.5rem;
                    justify-content: center;
                    margin: 0;
                    width: 100%;
                }
                .contact_form__button {
                    font-size: 1rem;
                    margin: 0;
                    padding: 0.5rem 1rem;
                }
                .contact_form__title h6 {
                    font-size: 1.1rem;
                    font-weight: normal;
                }
                .contact_form_form, .contact_form {
                    align-items: center;
                    gap: 1rem;
                    justify-content: center;
                }
                .contact_logo {
                    align-content: center;
                    display: flex;
                    justify-content: center;
                    margin: auto;
                }
                .contact_logo_img {
                    width: 30%;
                }
                .map_iframe {
                    display: none;
                }
                .menu {
                    align-items: center;
                    gap: 1.3rem;
                    justify-content: center;
                    text-align: center;
                }
                .menu_item {
                    font-size: 1.1rem;
                    text-align: center;
                }
            }


            @media (min-width:768px) and (max-width:1023px) {
                .contact {
                    align-items: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    justify-content: center;
                    padding: 2rem 0;
                }
                .contact_content {
                    gap: 4rem;
                    width: 95%;
                }
                .contact_form__button {
                    font-size: 1rem;
                    margin: 0;
                }
                .contact_form__input, .menssage {
                    width: 25rem;
                }
                .contact_form__title h6 {
                    font-size: 1.2rem;
                    text-align: center;
                }
                .contact_form_form, .contact_form {
                    align-items: center;
                    justify-content: center;
                }
                .contact_logo {
                    align-content: center;
                    display: flex;
                    justify-content: center;
                    margin: auto;
                }
                .menu {
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                .menu_item {
                    font-size: 1rem;
                    text-align: center;
                }
            }


            @media (min-width:1024px) and (max-width:1279px) {
                .contact_content {
                    gap: 7rem;
                    width: 90%;
                }
                .contact_form__button {
                    margin: 0;
                }
                .contact_form__input, .menssage {
                    width: 30rem;
                }
                .contact_form__title {
                    text-shadow: none;
                }
                .contact_form__title h6 {
                    font-size: 1.3rem;
                    text-align: center;
                }
                .contact_form_form {
                    align-items: center;
                    justify-content: center;
                }
                .contact_logo_img {
                    width: 40%;
                }
                .contact_menu {
                    padding-left: 3rem;
                }
            }


            @media (min-width:1280px) {
                .contact_content {
                    gap: 9rem;
                    width: 90%;
                }
                .contact_form__button {
                    margin: 0;
                }
                .contact_form_form {
                    align-items: center;
                    justify-content: center;
                }
            }
        `;
        shadowRoot.appendChild(style);

        const form = shadowRoot.querySelector('#contact_form_form');
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar que el formulario se envíe
                window.location.href = urlConstructionHtml; // Redirigir a la página "En Construcción"
            });
        }
    }
}

customElements.define('contact-component', Contact);