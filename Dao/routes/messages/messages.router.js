const express = require('express');
const { messageModel } = require('../../models/messages/messages.models');

const messageRouter = express.Router();

//get
messageRouter.get('/api/messages', async (req, res) => {
    try {
        let messages = await messageModel.find();
        res.send({ status: 'success', payload: messages });
    } catch (error) {
        console.log(error);
    }
})

//post
messageRouter.post('/api/messages', async (req, res) => {
    try {
        const { user, message } = req.body;

        if (!user || !message) {
            res.send({ status: 'error', error: 'faltan datos' });
            return
        }

        let result = await messageModel.create({ user, message });
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
})

module.exports = messageRouter;