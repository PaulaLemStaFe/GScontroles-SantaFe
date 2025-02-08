const headerTemplate = document.createElement('template');

var urlIndexHtml = '/index.html';
var urlImageLogoHtml = '/assets/images/logo-solo/logo-nombre.png';
var urlImageFondoHtml = '/assets/images/fondos/fondo-de-logo.jpg';
var urlSearchHtml = '/assets/pages/search/search.html';
var urlConstructionHtml = '/assets/pages/underconstruction/underconstruction.html';
var urlProductsHtml = '/assets/pages/products/allproducts.html';

headerTemplate.innerHTML = `
        <header class="navbar">
            <div class="navegacion">
                <img class="logo_image" alt="GS Controles" title="GS Controles">
                <div class="menu_buscador">
                    <div class="menu">
                        <nav>
                            <ul class="menu_list">
                                <li><a href="${urlIndexHtml}" title="Página Principal">Inicio</a></li>
                                <li class="submenu"><a href="${urlProductsHtml}" title="Productos">Productos</a>
                                    <ul class="submenu_list">
                                        <li><a href="/assets/pages/products/allproducts.html?category=all" title="Ingresa para ver todos nuestros productos">Todos</a></li>
                                        <li><a href="/assets/pages/products/allproducts.html?category=producttv&title=Controles Remotos de Televisores" title="Controles remotos para televisores">Televisor</a></li>
                                        <li><a href="/assets/pages/products/allproducts.html?category=productac&title=Controles Remotos de Aire Acondicionados" title="Controles remotos para aires acondicionados">Aire Acondicionado</a></li>
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
                <div class="button">
                    <a class="login_button login_link" href="${urlConstructionHtml}" rel="noopener noreferrer" alt="Login" title="Login">Login</a>
                </div>
            </div>
        </header>

`;


class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        const logo = document.querySelector('link[href*="logo"]');
        const responsive = document.querySelector('link[href*="responsive"]');
        const shadowRoot = this.attachShadow({ mode: 'closed' });

        [fontAwesome, logo, responsive].forEach(link => {
            if (link) {
                shadowRoot.appendChild(link.cloneNode());
            }
        });

        shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

        const style = document.createElement('style');
        style.textContent = `
            @import url('/assets/css/style.css');
                
            .navbar {
                align-items: center;
                background-image: url(${urlImageFondoHtml});
                background-position: center;
                display: flex;
                justify-content: space-between;
                margin: 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1;
            }

            .navegacion {
                align-items: center;
                display: flex;
                justify-content: space-around;
                margin: 0 1rem;
                padding: 0.1rem 0;
                width: 100%;
            }

            .logo_image {
                content: url(${urlImageLogoHtml});
                display: flex;
                width: 15%;
            }

            .menu_buscador {
                display: flex;
                gap: 0.4rem;
            }

            .menu_list {
                align-items: center;
                background-color: var(--color-tertiary);
                border-radius: 15px;
                display: flex;
                justify-content: center;
                list-style: none;
                padding-left: 0;
            }

            .menu_list li {
                margin: 0 0.5rem;
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
                background-color: var(--color-primary); /* Añade sombra */
                border-radius: 50%;
                color: var(--color-fifth);
                text-shadow: 0 10px 15px var(--color-fourth); /* Cambia el fondo cuando pasas el cursor */
                transform: scale(1.15); /* Aumenta el tamaño del texto */
                transition: all 1.2s;
            }

            /* Estilo para el submenú */
            .submenu {
                position: relative;
            }

            .submenu_list {
                background-color: var(--color-tertiary);
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
            }

            /* Keyframes para retrasar la aparición del submenú */
            @keyframes delayShow {
                0% { display: block; opacity: 0; }
                100% { display: block; opacity: 1; }
            }

            /* Aplicar la animación al pasar el mouse */
            .submenu:hover .submenu_list {
                animation: delayShow 0s 0.5s forwards; /* 0s de duración, 0.5s de retraso */
                display: block;
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
                transform: scale(1.1); /* Aumenta el tamaño del texto */
                transition: all 1.1s;
            }

            /* Mostrar el submenú al pasar el mouse */
            .submenu:hover .submenu_list {
                display: block;
            }

            /* search */
            .buscador_menu {
                align-items: center;
                border-radius: 1rem;
                display: flex;
                position: relative;
            }

            .bi_menu, .bi_modal {
                cursor: pointer;
            }

            .bi-search_menu, .bi-search_modal {
                cursor: pointer;
                font-size: 1.2rem; /* Aumenta el tamaño del ícono */
                font-weight: 900; /* Añade peso al ícono */
            }

            .bi-search_menu svg, .bi-search_modal svg {
                height: 1.2rem; /* Ajusta la altura del SVG */
                stroke-width: 4; /* Aumenta el grosor del trazo */
                width: 1.2rem; /* Ajusta el ancho del SVG */
            }

            .bi-search_menu path {
                stroke: rgba(255, 255, 255, 0.3);
            }

            .bi-search_modal path {
                stroke: rgba(110, 110, 110, 0.3);
            }

            .login_button {
                background-color: var(--color-tertiary);
                border: solid var(--color-fourth) 1px;
                border-radius: 50%;
                color: var(--color-primary);
                cursor: pointer;
                padding: 1rem 2.5rem;
                text-align: center;
                transition: all 1s;
            }

            .login_button:hover {
                background-color: var(--color-primary);
                box-shadow: 0 0 10px var(--color-tertiary);
                color: var(--color-cuarto);
            }

            .login_link {
                text-decoration: none;
            }

            @media (min-width: 451px) and (max-width: 768px), (max-width: 450px) {
                .logo_image {
                    width: 90%;
                }

                .navegacion {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    margin: 0 auto;
                    max-width: 1920px;
                    padding: 1rem 0;
                    width: 90%;
                }

                .buscador {
                    align-items: center;
                    display: flex;
                    order: 3;
                    padding: 0;
                }

                .input_icon {
                    font-size: 2rem;
                }

                .bi, .bi-search {
                    cursor: pointer;
                }

                .bi-search::before {
                    color: #464646;
                    font-size: 2rem;
                    font-weight: 900;
                    margin: 0;
                    padding: 0;
                }
                
                .input__buscador {
                    border: none;
                    border-radius: 1rem;
                    display: none;
                    font-size: 1rem;
                    outline: none;
                    padding-left: 1rem;
                }

                .login_button {
                    cursor: pointer;
                    margin: 0;
                    padding: 1rem 2rem;
                    text-align: center;
                    width: 10%;
                }
            }

            @media (max-width: 450px) {
                .logo_image {
                    width: 75%;
                }

                .navegacion {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    margin: 0 auto;
                    max-width: 1920px;
                    padding: 1rem 0;
                    width: 90%;
                }

                .buscador {
                    align-items: center;
                    border-radius: 1rem;
                    display: flex;
                    order: 3;
                    padding: 0;
                }

                .input_icon {
                    font-size: 2rem;
                }

                .bi, .bi-search {
                    cursor: pointer;
                }

                .bi-search::before {
                    font-size: 2rem;
                    font-weight: 900;
                    margin: 0;
                    padding: 0;
                }
                
                .input__buscador {
                    border: none;
                    border-radius: 1rem;
                    display: none;
                    font-size: 1rem;
                    height: 2.5rem;
                    outline: none;
                    padding-left: 1rem;
                    width: 24rem;
                }

                .login_button {
                    cursor: pointer;
                    margin: 0;
                    padding: 1rem 3rem;
                    text-align: center;
                    width: 10%;
                }
            }
        `;
        shadowRoot.appendChild(style);

        shadowRoot.appendChild(headerTemplate.content);
            }
        }
customElements.define('header-component', Header);