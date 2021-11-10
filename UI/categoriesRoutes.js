const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
//TO DO 
//const config
//const url = `${config.url.categories}`;

router.
    post('/', async (req, res, next) => {
        try {
            const response = await fetch(url, {
                method: 'POST', 
                body: JSON.stringify(req.body),
                headers: { 'Content-Type': 'application/json'}
            });
            res.redirect('/');
        } catch (error) {
            return next(error);
        };
    })
    .get('/create', (req, res, next) => {
        // render the new category form
        res.render('createrestaurant');
      })

