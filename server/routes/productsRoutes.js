const { Product } = require('../connect');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch(error) {
        res.status(400).send(error.message);
    };
})

//gets all products
.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({});
        res.status(201).send(products);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//gets a single product
.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({where: {id: productId}});
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//updates product
.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.update({title: req.body.title, price: req.body.price, description: req.body.description, image: req.body.image}, {where: {id: productId}});
        res.status(201).send(updatedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//deletes product
.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.destroy({where: {id: productId}});
        res.status(201).send(deletedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

module.exports = router;