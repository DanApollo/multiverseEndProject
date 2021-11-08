// get the seq package
const Sequelize = require("sequelize");

// model = outline of the data we'll store against an entity
const user_model = {
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
const basket_model = {
};
const basket_items_model = {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}
const products_model = {
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
const category_model = {
    title: {
        type: Sequelize.STRING
    }
}

module.exports = { user_model, basket_model, basket_items_model, products_model, category_model };