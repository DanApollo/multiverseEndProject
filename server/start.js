const app = require("./index"); // the actual Express application
const { sequelize } = require("./connect");
const http = require("http");

const PORT = 3001;

const server = http.createServer(app);

async function start() {
  await sequelize.sync({
    logging: false,
  });
}

start()
  .then(() => console.log("Sequelize connected"))
  .catch((e) => console.log(`Caught error: ${e}`));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
