import ky from 'ky';

const baseUrl = 'http://localhost:3001/'

const getAll = () => {
    ky
    .get(`${baseUrl}/products`).json()
}

export default { getAll }