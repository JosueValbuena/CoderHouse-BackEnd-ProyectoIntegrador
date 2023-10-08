const express = require('express');
const ProductManager = require('../../class/products/products.class');
const productsFSRouter = express.Router();

const products = new ProductManager();

//get
productsFSRouter.get('/api/fs/products', async (req, res) => {
    try {
        const data = await products.getProducts();
        res.json(data);
    } catch (error) {
        res.send(error)
    }
})

//post
productsFSRouter.post('/api/fs/products', async (req, res) => {
    try {
        const {title, description, price, stock} = req.body;
        await products.addProduct(title, description, price, stock);
        res.send('Producto agregado correctamente');     
    } catch (error) {
        res.send(error)
    }
})

//put
productsFSRouter.put('/api/fs/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, price, stock} = req.body;
        console.log({id, title, description, price, stock})
        await products.modifyProduct(id, title, description, price, stock);
        res.send('Producto modificado correctamente')
    } catch (error) {
        res.send(error)
    }
})

//delete
productsFSRouter.delete('/api/fs/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await products.deleteProduct(id);
        res.send('Producto eliminado correctamente')
    } catch (error) {
        res.send(error);
    }
})

module.exports = productsFSRouter;