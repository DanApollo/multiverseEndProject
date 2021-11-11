const Sequelize = require("sequelize");

const userModel = {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Username already in use!",
    },
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
      is: {
        args: [/^[a-zA-Z\s]*$/i],
        msg: "Can only contain letters and spaces.",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notNull: {
        msg: "Cannot be null",
      },
    },
  },
};
const basketModel = {};
const basketItemModel = {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must have quantity.",
      },
      isInt: {
        msg: "Quantity must only contain integers.",
      },
    },
  },
};
const productModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must have title.",
      },
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must have price.",
      },
      isFloat: {
        msg: "Price input must be floating point.",
      },
    },
  },
  description: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isURL: {
        msg: "Must be an image link.",
      },
    },
  },
};
const categoryModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must have title.",
      },
    },
  },
};

module.exports = {
  userModel,
  basketModel,
  basketItemModel,
  productModel,
  categoryModel,
};
