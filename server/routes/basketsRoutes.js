const { Basket } = require('../connect');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const basket = await Basket.create(req.body);
        res.status(201).send(basket);
    } catch(error) {
        res.status(400).send(error.message);
    };
});

//gets all baskets
router.get('/', async (req, res) => {
    try {
        const baskets = await Basket.findAll({});
        res.status(201).send(baskets);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

//gets a single basket
router.get('/:id', async (req, res) => {
    try {
        const basketId = req.params.id;
        const basket = await Basket.findOne({where: {id: basketId}});
        res.status(201).send(basket);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

//deletes basket
router.delete('/:id', async (req, res) => {
    try {
        const basketId = req.params.id;
        const deletedBasket = await Basket.destroy({where: {id: basketId}});
        res.status(201).send(deletedBasket);
    } catch (error) {
        res.status(400).send(error.message);
    };
});
