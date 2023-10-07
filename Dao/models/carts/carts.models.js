const mongoose = require('mongoose');

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, require: true },
    qty: { type: Number, required: true }
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = { cartsModel };