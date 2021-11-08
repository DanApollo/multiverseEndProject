const Sequelize = require('sequelize');
const {  } = require('./models/models');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});





module.exports = { sequelize };