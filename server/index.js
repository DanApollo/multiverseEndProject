const { sequelize } = require("./connect");
const routes = require("./routes/index-router.js");

app.use("/", routes);
// app.use("/api/users", userRoutes);
// app.use("/api/basket", basketRoutes);
// app.use("/api/basket-items", basketItemsRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/category", categoryRoutes);

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