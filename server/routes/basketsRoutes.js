const { Basket } = require("../connect");

const express = require("express");
const router = express.Router();

// Creates a new basket
router
  .post("/", async (req, res) => {
    try {
      const basket = await Basket.create(req.body);
      res.status(201).send(basket);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Gets all baskets
  .get("/", async (req, res) => {
    try {
      const baskets = await Basket.findAll({});
      res.status(200).send(baskets);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Gets a single basket by ID
  .get("/:id", async (req, res) => {
    try {
      const basket = await Basket.findByPk(req.params.id);
      basket == null
        ? res
            .status(404)
            .send(
              `Basket: ${req.params.id} does not exist. Please check the id number and try again.`
            )
        : res.status(200).send(basket);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Deletes basket by ID
  .delete("/:id", async (req, res) => {
    try {
      await Basket.destroy({ where: { id: req.params.id } });
      res
        .status(200)
        .send(`Account for user: ${req.params.id} has been deleted`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;
