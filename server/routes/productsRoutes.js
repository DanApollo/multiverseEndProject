const { Product, Category } = require("../connect");

const express = require("express");
const router = express.Router();

// Creates new product
router
  .post("/", async (req, res) => {
    try {
      // Assign request body to new variable.
      let item = req.body;
      // Assign 'categoryId' property of 'item' object to new variable.
      let categoryId = item.categoryId;
      // Delete 'categoryId' property of 'item' object.
      delete item.categoryId;
      // Create Product entity from 'item' object (without a category property) and assign to 'product' variable.
      const product = await Product.create(item);
      /* If category does not already exist in 'Category' table of database,
            throw new Error. */
      if ((await Category.findByPk(categoryId)) === null) {
        throw new Error("This Id does not match any current categories.");
      } else {
        // Find 'Category' with PK  matching "categoryId"
        const category = await Category.findByPk(categoryId);
        // Add 'category' property back to 'product' as FK
        await category.addProduct(product);
        // Reloads 'product' variable to send updated JSON object back as response.
        await product.reload();
      }
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  //gets all products
  .get("/", async (req, res) => {
    try {
      const products = (await Product.findAll({})) || undefined;
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  //gets all products with categories
  .get("/cat", async (req, res) => {
    try {
      const products =
        (await Product.findAll({ include: Category })) || undefined;
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  //gets a single product by ID
  .get("/:id", async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      product == null
        ? res
            .status(404)
            .send(
              `Product: ${req.params.id} does not exist. Please check the id number and try again.`
            )
        : res.status(200).send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  //updates product by ID
  .put("/:id", async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      await product.update(req.body);
      await product.save();
      await product.reload();

      res.status(200).send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  //deletes product by ID
  .delete("/:id", async (req, res) => {
    try {
      await Product.destroy({ where: { id: req.params.id } });
      res.status(200).send(`Product: ${req.params.id} has been deleted`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;
