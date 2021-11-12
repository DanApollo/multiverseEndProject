// Main router entry point, sets up all route modules
const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoutes");
const basketsRouter = require("./basketsRoutes");
const basketItemsRouter = require("./basketItemsRoutes");
const productsRouter = require("./productsRoutes");
const categoriesRouter = require("./categoriesRoutes");

router.use("/api/users", usersRouter);
router.use("/api/baskets", basketsRouter);
router.use("/api/basket-items", basketItemsRouter);
router.use("/api/products", productsRouter);
router.use("/api/categories", categoriesRouter);

module.exports = router;
