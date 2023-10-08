const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.products = [];
    }

    async getProducts() {
        const data = await fs.readFile("products.json", 'utf-8');
        const res = JSON.parse(data);
        return res
    }

    async addProduct(title, description, price, stock) {
        const id = Date.now();

        const product = {
            id,
            title,
            description,
            price,
            stock
        };

        let currentData;
        const data = await fs.readFile("products.json", 'utf-8');
        currentData = JSON.parse(data);
        currentData.push(product);

        this.products = (currentData);

        await fs.writeFile("products.json", JSON.stringify(this.products));
    };

    async modifyProduct(id, title, description, price, stock) {
        const query = await fs.readFile('products.json', 'utf-8');
        const data = JSON.parse(query);

        const index = data.findIndex(ele => ele.id === Number(id));

        if (index !== -1) {
            const newProduct = {
                id,
                title,
                description,
                price,
                stock
            };

            data.splice(index, 1, newProduct);

            await fs.writeFile('products.json', JSON.stringify(data));
        } else {
            console.error('Producto no encontrado')
        }
    }

    async deleteProduct(id) {
        const query = await fs.readFile('products.json', 'utf-8');
        const data = JSON.parse(query);

        const index = data.findIndex(ele => ele.id === Number(id));

        if (index !== -1) {
            data.splice(index, 1);

            await fs.writeFile('products.json', JSON.stringify(data));
            console.log('Producto eliminado')
        }
        else{
            console.log('Producto no encontrado')
        }

    }
};

module.exports = ProductManager;