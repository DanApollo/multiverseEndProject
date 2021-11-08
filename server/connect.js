const Sequelize = require("sequelize");
const {
    userModel,
    basketModel,
    basketItemModel,
    productModel,
    categoryModel,
} = require("./models/models");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "path/to/database.sqlite",
});

const User = sequelize.define("User", userModel);
const Basket = sequelize.define("Code", basketModel);
const BasketItem = sequelize.define("Code", basketItemModel);
const Product = sequelize.define("Code", productModel);
const Category = sequelize.define("Code", categoryModel);

User.hasOne(Basket);
Basket.belongsTo(User);
Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);
Product.hasMany(BasketItem);
BasketItem.belongsTo(Product);
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = { sequelize, User, Basket, BasketItem, Product, Category };
