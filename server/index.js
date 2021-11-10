const express = require("express");

const { sequelize } = require("./connect");
const routes = require("./routes/indexRouter.js");
const cors = require("cors");
const app = express();
const port = 3000;
require('dotenv').config(); //allows us to reference the environment variables

const { auth, requiresAuth } = require('express-openid-connect');

app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL ,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET
    })
);

app.get('/', async (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    //  if (req.oidc.isAuthenticated()) {
    //      const user = User.findOne({where: {email: req.oidc.user.name}});
    //      res.render(<App user={user}/>);
    //  }

});

app.get('/profile', requiresAuth(), async (req, res) => {
    //if(req.oidc.user)
    //{  res.send(database.findOne({ where: { name: req.oidc.user.name }})  }
    res.send('hi')
    //res.send(JSON.stringify(req.oidc.user.name))
    //res.render(<App user={userFromTheDatabase}/>)
})

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