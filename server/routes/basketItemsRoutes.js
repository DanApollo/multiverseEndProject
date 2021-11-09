const { BasketItem } = require('../connect');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const basketItem = await BasketItem.create(req.body);
        res.status(201).send(basketItem);
    } catch(error) {
        res.status(400).send(error.message);
    };
})

//gets all basket items
.get('/', async (req, res) => {
    try {
        const basketItems = await BasketItem.findAll({});
        res.status(201).send(basketItems);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//gets a single basket item
.get('/:id', async (req, res) => {
    try {
        const basketItemId = req.params.id;
        const basketItem = await BasketItem.findOne({where: {id: basketItemId}});
        res.status(201).send(basketItem);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//updates basket item
.put('/:id', async (req, res) => {
    try {
        const basketItemId = req.params.id;
        const updatedBasketItem = await BasketItem.update({quantity: req.body.quantity}, {where: {id: basketItemId}});
        res.status(201).send(updatedBasketItem);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//deletes basketItem
.delete('/:id', async (req, res) => {
    try {
        const basketItemId = req.params.id;
        const deletedBasketItem = await BasketItem.destroy({where: {id: basketItemId}});
        res.status(201).send(deletedBasketItem);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

module.exports = router;
