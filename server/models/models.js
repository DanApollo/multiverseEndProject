// get the seq package
const Sequelize = require("sequelize");

// model = outline of the data we'll store against an entity
const userModel = {
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {

    }
};
const basketModel = {
};
const basketItemsModel = {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}
const productsModel = {
    title: {
        type: Sequelize.STRING,
    },
    price : {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
}
const categoryModel = {
    title: {
        type: Sequelize.STRING
    }
}

module.exports = { userModel, basketModel, basketItemsModel, productsModel, categoryModel };