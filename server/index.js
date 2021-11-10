const express = require("express");

const routes = require("./routes/indexRouter.js");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

module.exports = app;