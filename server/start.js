const app = require('./index') // the actual Express application
const { sequelize, User } = require("./connect");
const http = require('http')

const PORT = 3001;

const server = http.createServer(app)

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

app.get('/is-logged-in', async (req, res) => {
        const user = await req.oidc.isAuthenticated() ? User.findOne({where: { email : req.oidc.user.name}}) : null;
        res.send(user);
});

app.get('/profile', requiresAuth(), async (req, res) => {
    //{  res.send(database.findOne({ where: { name: req.oidc.user.name }})  }
    res.send(req.oidc.user.name);
    //res.send(JSON.stringify(req.oidc.user.name))
    //res.render(<App user={userFromTheDatabase}/>)
})

async function start() {
    await sequelize.sync({
        logging: false,
    });
}

start()
    .then(() => console.log("Sequelize connected"))
    .catch((e) => console.log(`Caught error: ${e}`));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})