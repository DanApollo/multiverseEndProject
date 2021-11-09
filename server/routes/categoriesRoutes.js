const { Category } = require('../connect');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).send(category);
    } catch(error) {
        res.status(400).send(error.message);
    };
})

//gets all categories
.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({});
        res.status(201).send(categories);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//gets a single category
.get('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findOne({where: {id: categoryId}});
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//updates category
.put('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updatedCategory = await Category.update({title: req.body.title}, {where: {id: categoryId}});
        res.status(201).send(updatedCategory);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

//deletes category
.delete('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.destroy({where: {id: categoryId}});
        res.status(201).send(deletedCategory);
    } catch (error) {
        res.status(400).send(error.message);
    };
});


module.exports = router
