// get the seq package
const Sequelize = require("sequelize");

// model = outline of the data we'll store against an entity
const userModel = {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Must have Username.",
            },
        },
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Must have name.",
            },
        },
    },
    password: {
        type: Sequelize.STRING
    },
};
const basketModel = {};
const basketItemModel = {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
};
const productModel = {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING,
    },
};
const categoryModel = {
    title: {
        type: Sequelize.STRING,
    },
};


module.exports = {
    userModel,
    basketModel,
    basketItemModel,
    productModel,
    categoryModel,
};
