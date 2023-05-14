const ApiError = require('../error/ApiError')
const db = require("../db");
class BrandController {
    async create(req, res) {
        const {name} = req.body
        const  brand = await db.query('INSERT INTO brands (name) values ($1) returning *', [name])
        console.log(brand.rows[0])
        return res.json(brand.rows[0])
    }

    async getAll(req, res){
        const brands = await db.query(`SELECT * FROM brands`)
        return res.json(brands.rows)
    }
}

module.exports = new BrandController()