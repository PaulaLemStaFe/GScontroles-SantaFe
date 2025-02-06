// Función para mezclar una lista de elementos
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

fetch('../../../db.json')
  .then(response => response.json())
  .then(data => {
    // Procesar productos de TV
    const productosTV = shuffle(data.producttv).slice(0, 6); // Mezclar y tomar los primeros 6 productos
    const containerTV = document.getElementById('productos-tv');

    productosTV.forEach(producto => {
      const div = document.createElement('div');
      div.className = 'product_item';
      div.innerHTML = `
        <div class="item_img">
          <img class="img" src="${producto.img}" alt="${producto.title}" title="${producto.title}">
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
      containerTV.appendChild(div);
    });

    // Procesar productos de AA
    const productosAA = shuffle(data.productsaa).slice(0, 6); // Mezclar y tomar los primeros 6 productos
    const containerAA = document.getElementById('productos-aa');

    productosAA.forEach(producto => {
      const div = document.createElement('div');
      div.className = 'product_item';
      div.innerHTML = `
        <div class="item_img">
          <img class="img_aa" src="${producto.img}" alt="${producto.title}" title="${producto.title}">
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
      containerAA.appendChild(div);
    });
  })
  .catch(error => console.error('Error al leer el archivo db.json:', error));
