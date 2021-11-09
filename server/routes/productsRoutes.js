const { Product } = require('../connect');

const express = require('express');
const router = express.Router();

// Creates new product
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
        const products = (await Product.findAll({}) || undefined);
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//gets a single product by ID
.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        product == null ?
        res.status(404).send(`Product: ${req.params.id} does not exist. Please check the id number and try again.`) :
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//updates product by ID
.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        await product.update(req.body);
        await product.save();
        await product.reload();

        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//deletes product by ID
.delete('/:id', async (req, res) => {
    try {
        await Product.destroy({where: { id: req.params.id }});
        res.status(201).send(`Product: ${req.params.id} has been deleted`);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

module.exports = router;