const ProductManager = require('./productManager');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

const products = [
    { id: 1, title: "Monitor ViewSonic VA2233-H 22″", category: "Monitores", price: 120, stock: 14 },
    { id: 2, title: "Monitor ASUS VG248QG 24″", category: "Monitores", "price": 275, "stock": 20 },
    { id: 3, title: "Monitor Acer Vg270 27″ IPS 165hz", category: "Monitores", price: 300, stock: 8 },
    { id: 4, title: "Monitor Viewsonic VX3218C-2K 32″", category: "Monitores", price: 465, stock: 3 },
    { id: 5, title: "Notebook Gamer ASUS TUF Gaming F15", category: "Notebooks", price: 899, stock: 9 },
    { id: 6, title: "Notebook ASUS Vivobook Go 15", category: "Notebooks", price: 530, stock: 9 },
    { id: 7, title: "AMD Ryzen 3 3200G con Radeon Vega 8", category: "Procesadores", price: 100, stock: 21 },
    { id: 8, title: "CPU AMD Ryzen 7 7700 AM5", category: "Procesadores", price: 520, stock: 5 },
    { id: 9, title: "CPU Intel Core i7 12700K", category: "Procesadores", price: 590, stock: 8 },
    { id: 10, title: "Teclado Logitech G915 TKL inalámbrico", category: "Teclados", price: 280, stock: 21 }
];

app.get('/products/', (req, res) => {
    const { query } = req; // const query = req.query;
    const { category } = query;
    if (!category) {
        res.json(products);
    } else {
        const result = products.filter((currentProduct) => currentProduct.category === category);
        res.json(result);
    }
});

app.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find((p) => {
        return p.id === parseInt(productId,);
    });
    if (!product) {
        res.json({ error: 'Producto no encontrado' })
    } else {
        res.json(product);
    }
});

app.listen(8080, () => {
    console.log('Servidor http escuchando en el puerto 8080.');
});