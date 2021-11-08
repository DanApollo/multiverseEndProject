const { sequelize } = require("./connect");

app.use("/api/users", userRoutes);
app.use("/api/codes", codeRoutes);

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