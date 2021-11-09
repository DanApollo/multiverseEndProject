const { sequelize, User, Basket, BasketItem, Product } = require("./connect");
// const routes = require("./routes/index-router.js");
const categoryRoutes = require("./routes/categories.js");
const express = require("express");
const port = 3030;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// app.use("/", routes);
// app.use("/api/users", userRoutes);
// app.use("/api/basket", basketRoutes);
// app.use("/api/basket-items", basketItemRoutes);
// app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);

async function start() {
    await sequelize.sync({
        logging: false,
    });
}

start()
    .then(() => console.log("Sequelize connected"))
    .catch((e) => console.log(`Caught error: ${e}`));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});