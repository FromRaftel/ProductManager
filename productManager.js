// Importamos el módulo "fs" de Node.js para trabajar con el sistema de archivos
const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // Método para agregar un nuevo producto
  addProduct(product) {
    const products = this.getProducts(); // Obtenemos los productos existentes
    const lastId = products.length > 0 ? products[products.length - 1].id : 0; // Obtenemos el último ID de producto
    const newProduct = { id: lastId + 1, ...product }; // Generamos un nuevo producto con un ID único
    products.push(newProduct); // Agregamos el nuevo producto a la lista
    this.saveProducts(products); // Guardamos los productos actualizados en el archivo
    return newProduct; // Devolvemos el nuevo producto agregado
  }

  // Método para obtener todos los productos
  getProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8"); // Leemos el contenido del archivo en la ruta especificada
      return JSON.parse(data); // Parseamos los datos como un objeto JSON y los devolvemos
    } catch (error) {
      return []; // En caso de error al leer el archivo, devolvemos una lista vacía
    }
  }

  // Método para obtener un producto por su ID
  getProductById(id) {
    const products = this.getProducts(); // Obtenemos todos los productos
    return products.find((product) => product.id === id); // Buscamos el producto con el ID especificado y lo devolvemos
  }

  // Método para actualizar un producto
  updateProduct(id, updatedFields) {
    const products = this.getProducts(); // Obtenemos todos los productos
    const productIndex = products.findIndex((product) => product.id === id); // Buscamos el índice del producto con el ID especificado

    if (productIndex !== -1) {
      // Si se encontró el producto
      const updatedProduct = { ...products[productIndex], ...updatedFields }; // Creamos una copia actualizada del producto
      products[productIndex] = updatedProduct; // Reemplazamos el producto existente por el actualizado
      this.saveProducts(products); // Guardamos los productos actualizados en el archivo
      return updatedProduct; // Devolvemos el producto actualizado
    }

    return null; // Si no se encontró el producto, devolvemos null
  }

  // Método para eliminar un producto
  deleteProduct(id) {
    const products = this.getProducts(); // Obtenemos todos los productos
    const productIndex = products.findIndex((product) => product.id === id); // Buscamos el índice del producto con el ID especificado

    if (productIndex !== -1) {
      // Si se encontró el producto
      const deletedProduct = products.splice(productIndex, 1)[0]; // Eliminamos el producto de la lista y lo guardamos
      this.saveProducts(products); // Guardamos los productos actualizados en el archivo
      return deletedProduct; // Devolvemos el producto eliminado
    }

    return null; // Si no se encontró el producto, devolvemos null
  }

  // Método para guardar los productos en el archivo
  saveProducts(products) {
    const data = JSON.stringify(products, null, 2); // Convertimos la lista de productos a una cadena JSON formateada
    fs.writeFileSync(this.path, data); // Escribimos la cadena JSON en el archivo en la ruta especificada
  }
}

module.exports = ProductManager; // Exportamos la clase ProductManager
