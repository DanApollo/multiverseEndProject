const express = require("express");

const { sequelize } = require("./connect");
const routes = require("./routes/indexRouter.js");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);


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