const supertest = require("supertest");
const request = require("supertest");
const { sequelize } = require("../../connect");
const app = require("../../index");
const api = supertest(app);


beforeAll(async () => {
    await sequelize.sync({
        force: true,
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

describe("DELETE by id", () => {
    test("Delete a user", async () => {
        const response = await request(app).post("/api/users").send({
            "username": "testGetId",
            "name": "name",
            "password": null,
            "isAdmin": false
        })
        const deleteItem = await request(app).delete("/api/users/" + response.body.id)
        expect(deleteItem.statusCode).toBe(200)
        const getById = await request(app).get("/api/users/" + response.body.id)
        expect(getById.statusCode).toBe(404)
        
    })
})

describe("POST", () => {
    test("should respond with a 201 status code", async () => {
        const response = await request(app).post("/api/users").send({
            "username": "testRespond201",
            "name": "name",
            "password": null,
            "isAdmin": false
        })
        expect(response.statusCode).toBe(201)
        await request(app).delete("/api/users/" + response.body.id)
    })
    
    test("should return json in the content type header", async () => {
        const response = await request(app).post("/api/users").send({
            "username": "testReturnJSON",
            "name": "name",
            "password": null,
            "isAdmin": false
        })
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        await request(app).delete("/api/users/" + response.body.id)
    })

    test("response object contains an ID", async () => {
        const response = await request(app).post("/api/users").send({
            "username": "testContainsId",
            "name": "name",
            "password": null,
            "isAdmin": false
        })
        expect(response.body.id).toBeDefined()
        await request(app).delete("/api/users/" + response.body.id)    
    })
})


describe("PUT", () => {
    test("User has been successfully updated", async () => {
        const response = await request(app).post("/api/users").send({
            "username": "testUpdateUser",
            "name": "name",
            "password": null,
            "isAdmin": false
        })
        const UpdateUser = await request(app).put("/api/users/" + response.body.id).send({
            username: "UpdatedUserName"
        })
        console.log(UpdateUser)
        expect(UpdateUser.body.username).toBe("UpdatedUserName")
        await request(app).delete("/api/users/" + response.body.id)   
    })
})
