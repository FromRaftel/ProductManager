const ProductManager = require("./productManager");

const productManager = new ProductManager("./products.json");

// Agrega un producto
const newProduct = productManager.addProduct({
  title: "Nuevo producto",
  description: "Descripción del nuevo producto",
  price: 100,
  thumbnail: "imagen.jpg",
  code: "TEST123",
  stock: 20,
});
console.log("Producto agregado:", newProduct);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

// Obtener un producto por ID
const productId = 1; // ID del producto a buscar
const productById = productManager.getProductById(productId);
console.log("Producto por ID:", productById);

// Actualizar un producto
const updatedProduct = productManager.updateProduct(productId, {
  price: 1100,
});
console.log("Producto actualizado:", updatedProduct);

// Eliminar un producto
const deletedProduct = productManager.deleteProduct(productId);
console.log("Producto eliminado:", deletedProduct);
