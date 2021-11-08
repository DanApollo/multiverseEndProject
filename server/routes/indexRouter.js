// Main router entry point, sets up all route modules
const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRoutes');
const basketsRouter = require('./basketRoutes');
const basketItemsRouter = require('./basketItemRoutes');
const productsRouter = require('./productsRoutes');
const categoriesRouter = require('./categoriesRoutes');

router.use("/api/users", usersRouter);
router.use("/api/basket", basketsRouter);
router.use("/api/basket-items", basketItemsRouter);
router.use("/api/product", productsRouter);
router.use("/api/category", categoriesRouter);

module.exports = router;