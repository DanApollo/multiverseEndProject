const { User } = require('../connect');

const express = require('express');
const router = express.Router();

// Creates new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch(error) {
        res.status(400).send(error.message);
    };
})

// Gets all users
.get('/', async (req, res) => {
    try {
        const users = await User.findAll({});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

// Gets a single user by ID
.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        user == null ?
        res.status(404).send(`User: ${req.params.id} does not exist. Please check the id number and try again.`) :
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

// Updates a user by id
.put('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        await user.update(req.body);
        await user.save();
        await user.reload();

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    };
})

// Deletes user by id
.delete('/:id', async (req, res) => {
    try {
        await User.destroy({where: { id: req.params.id }});
        res.status(200).send(`Account for user: ${req.params.id} has been deleted`);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

module.exports = router;
