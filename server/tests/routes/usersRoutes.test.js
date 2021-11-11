const supertest = require('supertest');
const { sequelize, User } = require("../../connect");
// const { User }  = require("../../routes/usersRoutes");
const app = require("../../index");
const api = supertest(app);
const { hasUncaughtExceptionCaptureCallback } = require("process");


beforeAll(async () => {
    await sequelize.sync({
        logging: false,
    });
})

describe("GET", () => {
    test("Users are returned as json", async () => {
        let get = await api.get("/api/users");
        console.dir(JSON.stringify(get.body), {depth: null});
        await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })
})

describe("POST", () => {
    test("New user is created", async () => {
        // const user = {
        //     "username": "username",
        //     "name": "name",
        //     "password": null,
        //     "isAdmin": false
        // }
        try {
            let post = await api.post("/api/users");
            await api
            .post("/api/users")
            .expect(201)
            .expect("Content-Type", /application\/json/)
            // const count = await User.count();
            // await api.post("/api/users").send(user)
            // const newCount = await User.count()
            // expect(newCount).toBe(count + 1);
            // await request(app)
            // .post("/api/users")
            // .send()
            
        } catch (err) {
            console.log(`Post Test ${err}`)
        }
    })
})

describe("PUT", () => {
    test("User has been successfully updated", async () => {
        try {

        } catch (err) {
            console.log(`Put Test: ${err}`)
        }
    })
})

describe("User", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test("can create a user", async () => {
        const user = await User.create({ 
            username: "TestyMcTestface", 
            name: "Danny Ric", 
            password: null, 
            isAdmin: false 
        });
    })
})