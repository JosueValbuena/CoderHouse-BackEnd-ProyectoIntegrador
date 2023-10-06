const express = require('express');
const { productsModel } = require('../../models/products/products.models');

const productsRouter = express.Router();

//get
productsRouter.get('/api/products', async (req, res) => {
    try {
        let products = await productsModel.find();
        res.send({ status: 'success', payload: products })
    } catch (error) {
        console.log(error)
    }
})

//post
productsRouter.post('/api/products', async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            res.send({ status: 'error', error: 'Faltan datos' });
            return
        };

        let result = await productsModel.create({ title, description, code, price, stock, category });
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error)
    }
})

//put
productsRouter.put('/api/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productReplace = req.body;

        if (!productReplace.title ||
            !productReplace.description ||
            !productReplace.code ||
            !productReplace.price ||
            !productReplace.stock ||
            !productReplace.category) {
            res.send({ status: 'error', error: 'Faltan datos' });
            return
        };

        let result = await productsModel.updateOne({ _id: pid }, productReplace);
        res.send({ status: 'success', payload: result });

    } catch (error) {
        console.log(error)
    }
})

//delete
productsRouter.delete('/api/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        let result = await productsModel.deleteOne({_id: pid});
        res.send({status: 'success', payload: result});
    } catch (error) {
        console.log(error)
    }
})

module.exports = productsRouter;