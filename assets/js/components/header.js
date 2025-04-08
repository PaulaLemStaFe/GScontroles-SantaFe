const headerTemplate = document.createElement('template');

var urlConstructionHtml = 'https://PaulaLemStaFe.github.io/GScontroles-SantaFe/assets/pages/underconstruction/underconstruction.html';
var urlImageFondoHtml = 'https://raw.githubusercontent.com/PaulaLemStaFe/GScontroles-SantaFe/refs/heads/master/assets/images/fondos/fondo-de-logo.jpg';
var urlImageLogoHtml = 'https://raw.githubusercontent.com/PaulaLemStaFe/GScontroles-SantaFe/refs/heads/master/assets/images/logo-solo/logo-nombre.png';
var urlIndexHtml = 'https://PaulaLemStaFe.github.io/GScontroles-SantaFe/index.html';
var urlLoginHtml = 'https://PaulaLemStaFe.github.io/GScontroles-SantaFe/assets/pages/login/login.html';
var urlProductsHtml = 'https://PaulaLemStaFe.github.io/GScontroles-SantaFe/assets/pages/products/allproducts.html';
var urlSearchHtml = 'https://PaulaLemStaFe.github.io/GScontroles-SantaFe/assets/pages/search/search.html';

headerTemplate.innerHTML = `
        <header class="navbar">
            <div class="navegacion">
                <img class="logo_image" alt="GS Controles" title="GS Controles">
                <div class="menu_buscador">
                    <div class="menu">
                        <button class="menu_toggle" aria-label="Abrir menú">
                            &#9776; <!-- Código Unicode para el ícono de tres líneas -->
                        </button>
                        <nav class="nav_menu">
                            <ul class="menu_list">
                                <li><a href="${urlIndexHtml}" title="Página Principal">Inicio</a></li>
                                <li class="submenu"><a href="#" title="Productos">Productos</a>
                                    <ul class="submenu_list">
                                        <li><a href="${urlProductsHtml}?category=all" title="Ingresa para ver todos nuestros productos">Todos</a></li>
                                        <li><a href="${urlProductsHtml}?category=productcs&title=Controles Remotos de Convertidores Smart" title="Controles remotos para convertidores smart">Convertidor Smart</a></li>
                                        <li><a href="${urlProductsHtml}?category=producttv&title=Controles Remotos de Televisores" title="Controles remotos para televisores">Televisor</a></li>
                                        <li><a href="${urlProductsHtml}?category=productac&title=Controles Remotos de Aire Acondicionados" title="Controles remotos para aires acondicionados">Aire Acondicionado</a></li>
                                    </ul>
                                </li>
                                <li><a href="${urlIndexHtml}#woweare" title="Ingresa para conocer más de nuestra empresa">Quienes Somos</a></li>
                                <li><a href="${urlIndexHtml}#contact" title="Para saber más o para consultas, puedes ponerte en contacto con nosotros">Contacto</a></li>
                                <li>
                                    <div class="buscador_menu">
                                        <a class="input_icon_menu" href="${urlSearchHtml}" rel="noopener noreferrer" aria-label="Buscar productos" title="Busca el control remoto con la marca de tu electrodoméstico">
                                            <i class="bi_menu bi-search_menu">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi_menu bi-search_menu" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                </svg>
                                            </i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
`;


class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });

        // Clonar y adjuntar el template
        shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

        // Verificar si los elementos existen antes de usarlos
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        const logo = document.querySelector('link[href*="logo"]');
        const responsive = document.querySelector('link[href*="responsive"]');

        const links = [fontAwesome, logo, responsive].filter(link => link !== null);
        links.forEach(link => shadowRoot.appendChild(link.cloneNode()));

        // Agregar estilos
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
            /* Keyframes para retrasar la aparición del submenú */
            @keyframes delayShow {
                0% { display: block; opacity: 0; }
                100% { display: block; opacity: 1; }
            }
            .bi_menu, .bi_modal {
                cursor: pointer;
            }
            .bi-search_menu, .bi-search_modal {
                cursor: pointer;
                font-size: 1.2rem;
                font-weight: 900;
            }
            .bi-search_menu svg, .bi-search_modal svg {
                height: 1.2rem;
                stroke-width: 4;
                width: 1.2rem;
            }
            .bi-search_modal path {
                stroke: rgba(110, 110, 110, 0.3);
            }
            /* search */
            .buscador_menu {
                align-items: center;
                border-radius: 1rem;
                display: flex;
                position: relative;
            }
            .logo_image {
                content: url(${urlImageLogoHtml});
                left: 1rem;
                position: absolute;
                width: 15%;
            }
            .menu_buscador {
                display: flex;
                gap: 0.4rem;
            }
            .menu_list {
                align-items: center;
                display: flex;
                justify-content: center;
                list-style: none;
                padding-left: 0;
            }
            .menu_list a {
                color: var(--color-primary);
                cursor: pointer;
                display: block;
                font-size: 1.1rem;
                padding: 0.4rem 1rem;
                text-decoration: none;
                transition: all 1s;
            }
            .menu_list a:hover {
                text-shadow: 0 10px 15px var(--color-fourth);
                transform: scale(1.15);
                transition: all 1.2s;
            }
            .menu_list li {
                margin: 0 0.5rem;
            }
            /* Estilos para el botón del menú hamburguesa */
            .menu_toggle {
                display: block;
            }
            /* Mostrar el menú cuando está activo */
            .nav_menu.active {
                display: flex;
            }
            .navbar {
                align-items: center;
                background-blend-mode: lighten;
                background-color: rgba(255, 255, 255, 0.15);
                background-image: url(${urlImageFondoHtml});
                background-position: center;
                display: flex;
                justify-content: space-between;
                margin: 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 11;
            }
            .navegacion {
                align-items: center;
                display: flex;
                justify-content: center;
                margin: 0 1rem;
                padding: 0.1rem 0;
                width: 100%;
            }
            .submenu {
                position: relative;
            }
            .submenu:hover .submenu_list {
                animation: delayShow 0s 0.5s forwards;
                display: block;
            }
            .submenu_list {
                background-color: var(--color-fifth);
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                display: none;
                left: 0;
                list-style: none;
                margin: 0;
                opacity: 0;
                padding: 0;
                position: absolute;
                top: 100%;
                transition: opacity 0.5s;
                z-index: 10000;
            }
            .submenu_list li {
                border-bottom: 1px solid var(--color-secondary);
            }
            .submenu_list li a {
                color: var(--color-primary);
                display: block;
                padding: 8px 16px;
                text-decoration: none;
            }
            .submenu_list li a:hover {
                background-color: inherit;
                border-radius: 0;
                color: var(--color-primary);
                transform: scale(1.1);
                transition: all 1.1s;
            }
            .submenu_list li:last-child a {
                border-bottom: none;
            }



            /* Media queries para dispositivos medianos y pequeños */
            @media (max-width: 479px) {
                .buscador_menu {
                    justify-content: center;
                    width: 100%;
                }
                /* Botón de cerrar menú */
                .close_menu {
                    font-size: 1.5rem;
                    position: absolute;
                    right: 20px;
                    top: 15px;
                }
                .close_menu, .menu_toggle {
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .logo_image {
                    padding: 0 1rem;
                    position: static;
                    width: 33%;
                }
                .menu_list {
                    align-items: flex-start;
                    flex-direction: column;
                    margin: 0.3rem;
                    text-align: left;
                }
                .menu_list a {
                    display: block;
                    font-size: 1rem;
                    padding: 0.5rem;
                    text-align: left;
                }
                .menu_list li {
                    border-bottom: 1px solid var(--color-secondary);
                    margin: 0;
                    width: 100%;
                }
                .menu_list li:last-child a {
                    border-bottom: none;
                }
                /* Estilos para el botón del menú hamburguesa */
                .menu_toggle {
                    color: var(--color-primary);
                    display: block;
                    font-size: 2rem;
                    padding: 0.5rem;
                }
                /* Estilos para el menú hamburguesa flotante */
                .nav_menu {
                    background-color: rgba(30, 32, 30, 0.8);
                    border-bottom-right-radius: 1rem;
                    display: none;
                    flex-direction: column;
                    position: fixed; /* Lo hace flotante */
                    transition: right 0.3s ease-in-out;
                }
                .navbar {
                    position: absolute;
                }
                .navegacion {
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    margin: 0;
                    padding: 0;
                    position: relative;
                }
                .submenu_list {
                    background-color: rgba(30, 32, 30, 0.8);
                    border-top-right-radius: 1rem;
                    left: 103.5%;
                    top: 0;
                }
                .submenu_list li a {
                    padding: 0.5rem;
                }
            }


            @media (min-width:480px) and (max-width:767px) {
                .buscador_menu {
                    justify-content: center;
                    width: 100%;
                }
                /* Botón de cerrar menú */
                .close_menu {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1.5rem;
                    position: absolute;
                    right: 20px;
                    top: 15px;
                }
                .close_menu, .menu_toggle {
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .logo_image {
                    padding: 0 1rem;
                    position: static;
                    width: 25%;
                }
                .menu_list {
                    align-items: flex-start;
                    flex-direction: column;
                    margin: 0.3rem;
                    text-align: left;
                }
                .menu_list a {
                    display: block;
                    font-size: 1rem;
                    padding: 0.5rem;
                    text-align: left;
                }
                .menu_list li {
                    border-bottom: 1px solid var(--color-secondary);
                    margin: 0;
                    width: 100%;
                }
                .menu_list li:last-child a {
                    border-bottom: none;
                }
                /* Estilos para el botón del menú hamburguesa */
                .menu_toggle {
                    color: var(--color-primary);
                    display: block;
                    font-size: 2rem;
                    padding: 0.5rem;
                }
                /* Estilos para el menú hamburguesa flotante */
                .nav_menu {
                    background-color: rgba(30, 32, 30, 0.8);
                    border-bottom-right-radius: 1rem;
                    display: none;
                    flex-direction: column;
                    position: fixed; /* Lo hace flotante */
                    transition: right 0.3s ease-in-out;
                }
                .navbar {
                    position: absolute;
                }
                .navegacion {
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    margin: 0;
                    padding: 0;
                    position: relative;
                }
                .submenu_list {
                    background-color: rgba(30, 32, 30, 0.8);
                    border-top-right-radius: 1rem;
                    left: 103.5%;
                    top: 0;
                }
                .submenu_list li a {
                    padding: 0.5rem;
                }
            }


            @media (min-width:768px) and (max-width:1023px) {
                .logo_image {
                    width: 17%;
                }
                .menu_list li {
                    margin: 0;
                }
                .menu_toggle {
                    display: none;
                }
            }


            @media (min-width:1024px) and (max-width:1279px) {
                .logo_image {
                    width: 20%;
                }
                .menu_list a {
                    font-size: 1.2rem;
                }
                .menu_list li {
                    margin: 0.5rem;
                }
                .menu_toggle {
                    display: none;
                }
            }


            @media (min-width:1280px) {
                .menu_toggle {
                    display: none;
                }
            }
        `;
        shadowRoot.appendChild(style);

        // Verificar elementos dentro del shadowRoot
        const menuToggle = shadowRoot.querySelector('.menu_toggle');
        const navMenu = shadowRoot.querySelector('.nav_menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        } else {
            console.error("Error: No se encontraron los elementos del menú dentro del shadowRoot.");
        }
    }
}

customElements.define('header-component', Header);