const { BasketItem } = require("../connect");

const express = require("express");
const router = express.Router();

// Creates new basket item
router
  .post("/", async (req, res) => {
    try {
      const basketItem = await BasketItem.create(req.body);
      res.status(201).send(basketItem);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Gets all basket items
  .get("/", async (req, res) => {
    try {
      const basketItems = await BasketItem.findAll({});
      res.status(200).send(basketItems);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Gets a single basket item by ID
  .get("/:id", async (req, res) => {
    try {
      const basketItem = await BasketItem.findByPk(req.params.id);
      basketItem == null
        ? res
            .status(404)
            .send(
              `Basket Item: ${req.params.id} does not exist. Please check the id number and try again.`
            )
        : res.status(200).send(basketItem);

      res.status(200).send(basketItem);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Updates basket item by ID
  .put("/:id", async (req, res) => {
    try {
      const basketItem = await BasketItem.findByPk(req.params.id);

      await basketItem.update(req.body);
      await basketItem.save();
      await basketItem.reload();

      res.status(200).send(basketItem);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Deletes basket item by ID
  .delete("/:id", async (req, res) => {
    try {
      await BasketItem.destroy({ where: { id: req.params.id } });
      res.status(200).send(`Basket Item: ${req.params.id} has been deleted`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;
