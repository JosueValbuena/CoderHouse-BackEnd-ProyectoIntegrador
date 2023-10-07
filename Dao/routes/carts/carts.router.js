const express = require('express');
const { cartsModel } = require('../../models/carts/carts.models');
const { productsModel } = require('../../models/products/products.models');
const cartsRouter = express.Router();

//get
cartsRouter.get('/api/carts', async (req, res) => {
    try {
        let carts = await cartsModel.find();
        res.send({ status: 'success', payload: carts });
    } catch (error) {
        res.send(error)
    }
});

//post
cartsRouter.post('/api/carts/:cid', async (req, res) => {
    try {
        let { cid } = req.params;

        const validObjectId = /^[0-9a-fA-F]{24}$/;

        if (!validObjectId.test(cid)) {
            res.send({ status: 'Error', message: `El ID porporcionado no es valido` })
            return
        };

        let cartProduct = await cartsModel.findOne({ _id: cid });

        if (!cartProduct) {

            let product = await productsModel.findOne({ _id: cid });

            /* res.send({ status: 'Error', message: `No existe producto con el ID ${cid} en la coleccion productos` }) */

            const cartProductNew = {
                id: product._id,
                title: product.title,
                qty: 1
            }

            await cartsModel.create(cartProductNew);
        } else {
            let qty = cartProduct.qty + 1;
            await cartsModel.updateOne({ _id: cid }, { $set: { qty } });
        }

        res.send("Producto agregado correctamente");
    } catch (error) {
        res.send(error)
    }
})

//put
cartsRouter.put('/api/carts/:cid', async (req, res) => {
    try {
        let { cid } = req.params;
        let { title } = req.body;

        const validObjectId = /^[0-9a-fA-F]{24}$/;

        if (!validObjectId.test(cid)) {
            res.send({ status: 'Error', message: `El ID porporcionado no es valido` })
            return
        };

        let result = await cartsModel.updateOne({ _id: cid }, { $set: { title } })

        res.send({ status: 'succes', payload: result });
    } catch (error) {
        res.send(error)
    }
})

//delete

cartsRouter.delete('/api/carts/:cid', async (req, res) => {
    try {
        let { cid } = req.params;

        const validObjectId = /^[0-9a-fA-F]{24}$/;

        if (!validObjectId.test(cid)) {
            res.send({ status: 'Error', message: `El ID porporcionado no es valido` })
            return
        };

        let result = await cartsModel.deleteOne({ _id: cid })

        res.send({status: "succes", payload: result});
    } catch (error) {
        res.send(error)
    }
})

module.exports = cartsRouter;