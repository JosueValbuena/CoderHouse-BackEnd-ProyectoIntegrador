const mongoose = require('mongoose');

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: String, max: 25, required: true },
    description: { type: String, max: 50, required: true },
    code: { type: String, max: 25, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, max: 25, required: true }
})

const productsModel = mongoose.model(productsCollection, productsSchema);

module.exports = { productsModel }