const supertest = require('supertest')
const { sequelize } = require("../connect");

beforeAll(async () => {
    await sequelize.sync({
        logging: false,
    });
})

const app = require('../index')

const api = supertest(app)

describe("GET", () => {
    test('products are returned as json', async () => {
        // let get = await api.get('/api/restaurants');
        // console.dir(JSON.stringify(get.body), {depth: null});
        await api
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
})