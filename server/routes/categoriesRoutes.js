const { Category } = require("../connect");

const express = require("express");
const router = express.Router();

// Creates new category
router
  .post("/", async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).send(category);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Gets all categories
  .get("/", async (req, res) => {
    try {
      const categories = await Category.findAll({});
      res.status(201).send(categories);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Gets a single category by ID
  .get("/:id", async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      category == null
        ? res
            .status(404)
            .send(
              `Category: ${req.params.id} does not exist. Please check the id number and try again.`
            )
        : res.status(200).send(category);

      res.status(201).send(category);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Updates category by ID
  .put("/:id", async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);

      await category.update(req.body);
      await category.save();
      await category.reload();

      res.status(201).send(category);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  // Deletes category by ID
  .delete("/:id", async (req, res) => {
    try {
      await Category.destroy({ where: { id: req.params.id } });
      res.status(201).send(`Category: ${req.params.id} has been deleted`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;
