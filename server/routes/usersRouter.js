const { User } = require('../connect');

const express = require('express');
const router = express.Router();

// Creates new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(category);
    } catch(error) {
        res.status(400).send(error.message);
    };
});

// Gets all users
router.get('/', async (req, res) => {
    try {
        const users = await Category.findAll({});
        res.status(201).send(categories);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

// Gets a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({where: req.params.id});
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

// Updates a user by id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.update({name: req.body.name, password: req.body.password}, {where: {id: categoryId}});
        res.status(201).send(updatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

// Deletes user by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({where: req.params.id});
        res.status(201).send(deletedUser);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

module.exports = router;