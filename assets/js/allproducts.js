// allproducts.js

// Objeto para almacenar los productos por categoría
let productos = { producttv: [], productac: [] };

// Cargar los datos desde el archivo db.json y mostrar los productos según los parámetros de la URL
fetch("../../../db.json")
    .then(response => response.json())
    .then(data => {
        productos.producttv = data.productstv;
        productos.productac = data.productsaa;
        mostrarProductosSegunParametros(data);
    })
    .catch((error) => console.error("Error al leer el archivo db.json:", error));
