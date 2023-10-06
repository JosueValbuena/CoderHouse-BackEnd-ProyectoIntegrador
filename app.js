const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const handlebars = require('express-handlebars');
const productsRouter = require('./Dao/routes/products/products.router');
const messageRouter = require('./Dao/routes/messages/messages.router');
require('dotenv').config();

const port = 8080;

const app = express();

app.use('/', express.json())
app.use('/', productsRouter);
app.use('/', messageRouter);
app.use(express.urlencoded({ extended: true }))

mongoose
.connect(process.env.DB_SECRET_KEY)
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.log(error)
})

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.hbs');
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})