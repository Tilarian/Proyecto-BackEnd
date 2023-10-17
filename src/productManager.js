const fs = require('fs'); // Common JS

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(data) {
    const { title, category, price, thumbnail, code, stock } = data;
    if (!title || !category || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios. ⛔');
    }

    // Leer el archivo
    const products = await getJsonFromFile(this.path);
    const lastProduct = products[products.length - 1];
    let lastProductId = 0;
    if (lastProduct) {
      lastProductId = lastProduct.id;
    }

    const newProduct = {
      id: lastProductId + 1,
      title,
      category,
      price,
      thumbnail,
      code,
      stock,
    };

    // Inyectar el nuevo producto
    products.push(newProduct);
    // Escribir los productos en el archivo
    saveJsonInFile(this.path, products);
    console.log("Se ha agregado un producto correctamente. ✅");
  }

  getProducts() {
    return getJsonFromFile(this.path);
  }

  async updateProduct(id, data) {
    const { title, category, price, thumbnail, code, stock } = data;
    const products = await getJsonFromFile(this.path);
    const position = products.findIndex((p) => p.id === id);
    if (position === -1) {
      throw new Error('Producto no encontrado 😨');
    }
    if (title) {
      products[position].title = title;
    }
    if (category) {
      products[position].category = category;
    }
    if (price) {
      products[position].price = price;
    }
    if (thumbnail) {
      products[position].thumbnail = thumbnail;
    }
    if (code) {
      products[position].code = code;
    }
    if (stock) {
      products[position].stock = stock;
    }
    await saveJsonInFile(this.path, products);
    console.log('Producto actualizado con exito 😎');
  }

  async deleteProduct(id) {
    const products = await getJsonFromFile(this.path);
    const position = products.findIndex((p) => p.id === id);
    if (position === -1) {
      throw new Error('Producto no encontrado 😨');
    }
    products.splice(position, 1);

    await saveJsonInFile(this.path, products);
    console.log('Producto borrado con exito 😎');
  }

  async getProductById(id) {
    const products = await getJsonFromFile(this.path);
    const position = products.findIndex((p) => p.id === id);

    if (position === -1) {
      throw new Error('Producto no encontrado 😨');
    }

    console.log('Producto encontrado: ', products[position]);
  }
}

const getJsonFromFile = async (path) => {
  if (!fs.existsSync(path)) {
    return [];
  }
  const content = await fs.promises.readFile(path, 'utf-8');
  return JSON.parse(content);
};

const saveJsonInFile = async (path, data) => {
  const content = JSON.stringify(data, null, '\t');
  await fs.promises.writeFile(path, content, 'utf-8');
}

async function test() {
  const productManager = new ProductManager('./Products.json');
  const data = {
    title: 'Teclado Logitech G915 TKL inalámbrico',
    category: 'Teclados',
    price: 280,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 14,
  };

  await productManager.addProduct(data);
  console.log(await productManager.getProducts());

  
  //await productManager.updateProduct(3, { stock: 10 });
  //console.log(await productManager.getProducts());

  //await productManager.deleteProduct(3);
  //console.log(await productManager.getProducts());

  //await productManager.getProductById(4);

}


module.exports = ProductManager;