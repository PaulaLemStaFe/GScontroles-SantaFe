// productsutils.js

/**
 * Crea un elemento de producto y lo agrega al contenedor especificado.
 * @param {HTMLElement} container - El contenedor donde se agregará el producto.
 * @param {Object} producto - Los datos del producto.
 * @param {string} imgClass - La clase CSS para la imagen del producto.
 */
function crearProducto(container, producto, imgClass) {
    if (!container) return; // Verificación adicional para evitar errores

    const div = document.createElement('div');
    div.className = 'product_item';
    div.innerHTML = `
        <div class="item_img">
            <img class="${imgClass}" src="${producto.img}" alt="${producto.title}" title="${producto.title}">
        </div>
        <h5 class="item_title">${producto.title}</h5>
        <div class="item_code">
            <span class="code">
                <span class="code_text">Código:</span>
                <span class="code_code">${producto.code}</span>
            </span>
        </div>
        <div class="item_footer">
            <p class="item_id">${producto.code}</p>
            <div class="footer_icons">
                <i class="bi bi-trash-fill" alt="Eliminar" title="Eliminar"></i>
                <i class="bi bi-pencil-fill" alt="Editar" title="Editar"></i>
            </div>
        </div>
        <a class="item_link" href="${producto.link}" rel="noopener noreferrer" alt="Ver Producto" title="Ver Producto">Ver Producto</a>
    `;
    container.appendChild(div);
}

/**
 * Mezcla una lista de elementos usando el algoritmo de Fisher-Yates.
 * @param {Array} array - La lista de elementos a mezclar.
 * @returns {Array} La lista mezclada.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
}

/**
 * Actualiza los atributos alt y title de una imagen.
 * @param {HTMLElement} image - La imagen a actualizar.
 * @param {Object} producto - Los datos del producto.
 */
function updateImageAttributes(image, producto) {
    if (image) {
        image.alt = producto.title;
        image.title = producto.title;
    } else {
        console.error('La imagen no se encontró.');
    }
}

/**
 * Función para cargar y procesar productos desde la base de datos.
 * @param {string} url - La URL del archivo db.json.
 * @param {HTMLElement} containerTV - El contenedor para productos de TV.
 * @param {HTMLElement} containerAA - El contenedor para productos de AA.
 */
function cargarProductos(url, containerTV, containerAA) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Procesar productos de TV si el contenedor existe
            if (containerTV) {
                const productosTV = shuffle(data.productstv).slice(0, 6); // Mezclar y tomar los primeros 6 productos de TV
                productosTV.forEach(producto => {
                    crearProducto(containerTV, producto, 'img');
                    updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto); // Actualizar los atributos de la imagen
                });
            } else {
                console.warn('El contenedor para productos de TV no se encontró en esta página.');
            }

            // Procesar productos de AA si el contenedor existe
            if (containerAA) {
                const productosAA = shuffle(data.productsaa).slice(0, 6); // Mezclar y tomar los primeros 6 productos de AA
                productosAA.forEach(producto => {
                    crearProducto(containerAA, producto, 'img_aa');
                    updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto); // Actualizar los atributos de la imagen
                });
            } else {
                console.warn('El contenedor para productos de AA no se encontró en esta página.');
            }
        })
        .catch(error => console.error('Error al leer el archivo db.json:', error));
}

/**
 * Función para mostrar productos según los parámetros de la URL.
 * @param {Object} data - Los datos del archivo db.json.
 */
function mostrarProductosSegunParametros(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const title = urlParams.get('title') || "Todos Los Productos";
    const productId = urlParams.get('idproduct');

    if (category === 'all') {
        document.getElementById("tituloCategoria").textContent = "Todos Los Productos";
        mostrarTodos(data);
    } else if (category) {
        document.getElementById("tituloCategoria").textContent = title;
        mostrarCategoria(category, title, productId, data);
    } else {
        mostrarTodos(data);
    }
}

/**
 * Función para mostrar todos los productos.
 * @param {Object} data - Los datos del archivo db.json.
 */
function mostrarTodos(data) {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }
    document.getElementById("tituloCategoria").textContent = "Todos Los Productos";
    container.innerHTML = "";
    [...data.productstv, ...data.productsaa].forEach((producto) => {
        crearProducto(container, producto, "img");
        // Actualizar los atributos de la imagen
        updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto);
    });
}

/**
 * Función para mostrar productos de una categoría específica.
 * @param {string} categoria - La categoría de los productos (producttv o productac).
 * @param {string} titulo - El título de la categoría.
 * @param {number} productId - El ID del producto (opcional).
 * @param {Object} data - Los datos del archivo db.json.
 */
function mostrarCategoria(categoria, titulo, productId, data) {
    const container = document.getElementById("productos");
    if (!container) {
        console.error("El contenedor para productos no se encontró.");
        return;
    }

    // Verificar que la categoría exista en los datos
    if (!productos[categoria]) {
        console.error(`La categoría ${categoria} no se encontró en los datos.`);
        return;
    }

    document.getElementById("tituloCategoria").textContent = titulo;
    container.innerHTML = "";

    let productosCategoria = productos[categoria];

    if (productId) {
        const product = data.productstv.find(p => p.idProduct == productId) || data.productsaa.find(p => p.idProduct == productId);
        if (product) {
            productosCategoria = productosCategoria.filter(
                (p) => [product.modelosoportado01, product.modelosoportado02, product.modelosoportado03, product.modelosoportado04].includes(p.modelosoportado01)
            );
        }
    }

    productosCategoria.forEach((producto) => {
        crearProducto(container, producto, "img");
        // Actualizar los atributos de la imagen
        updateImageAttributes(document.querySelector(`img[src="${producto.img}"]`), producto);
    });
}

/**
 * Función para mostrar detalles del producto y productos similares.
 * @param {string} url - La URL del archivo db.json.
 * @param {number} productId - El ID del producto a mostrar.
 */
function mostrarDetallesProducto(url, productId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Buscar el producto en ambas categorías
            let product, similarProducts, productCategory;
            if (product = data.productstv.find((p) => p.idProduct == productId)) {
                similarProducts = data.productstv; // Productos similares de la misma categoría TV
                productCategory = 'producttv';
            } else if (product = data.productsaa.find((p) => p.idProduct == productId)) {
                similarProducts = data.productsaa; // Productos similares de la misma categoría AA
                productCategory = 'productac';
            } else {
                console.error("Producto no encontrado.");
                return;
            }

            // Actualizar los detalles del producto
            const productImage = document.getElementById("product-image");
            productImage.src = product.img;
            updateImageAttributes(productImage, product);

            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-code").textContent = `Código: ${product.code}`;
            document.getElementById("product-color").textContent = `Color: ${product.color}`;
            document.getElementById("product-soportado1").textContent = product.modelosoportado01;
            document.getElementById("product-soportado2").textContent = product.modelosoportado02;
            document.getElementById("product-soportado3").textContent = product.modelosoportado03;
            document.getElementById("product-soportado4").textContent = product.modelosoportado04;
            document.getElementById("product-details1").textContent = product.details01;
            document.getElementById("product-details2").textContent = product.details02;
            document.getElementById("product-details3").textContent = product.details03;

            // Buscar productos similares por marca (modelosoportado01), de la misma categoría y excluir el producto actual
            let similarProductsFiltered = similarProducts.filter(
                (p) => 
                    [product.modelosoportado01, product.modelosoportado02, product.modelosoportado03, product.modelosoportado04].includes(p.modelosoportado01) && 
                    p.idProduct != productId
            );

            // Mezclar productos similares para que sean aleatorios
            const similarProductsToShow = shuffle(similarProductsFiltered).slice(0, 6); // Limitar a 6 productos

            // Mostrar productos similares
            const containerSimilar = document.getElementById("similar-products");
            if (containerSimilar) {
                similarProductsToShow.forEach((producto) => {
                    crearProducto(containerSimilar, producto, "img");
                });

                // Mostrar el enlace "Ver Todo" si hay más de 6 productos similares
                const viewAllLink = document.getElementById("view-all-link");
                if (similarProductsFiltered.length > 6) {
                    viewAllLink.style.display = "inline-block";
                    viewAllLink.href = `/assets/pages/products/allproducts.html?category=${productCategory}&title=Controles Remotos de ${productCategory === 'producttv' ? 'Televisores' : 'Aires Acondicionados'}&idproduct=${productId}`;
                } else {
                    viewAllLink.style.display = "none";
                }
            } else {
                console.error("El contenedor para productos similares no se encontró.");
            }
        })
        .catch((error) => console.error("Error al leer el archivo db.json:", error));
}
