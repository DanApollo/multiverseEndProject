const Sequelize = require('sequelize');
const { 
    userModel,
    basketModel,
    basketItemsModel,
    productsModel,
    categoryModel
} = require('./models/models');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});





module.exports = { sequelize };