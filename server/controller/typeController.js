const ApiError = require('../error/ApiError')
const db = require("../db");
class TypeController {
    async create(req, res) {
        const {name} = req.body
        const  type = await db.query('INSERT INTO types (name) values ($1) returning *', [name])
        return res.json(type.rows[0])
    }

    async getAll(req, res){
        const types = await db.query(`SELECT * FROM types`)
        return res.json(types.rows)
    }

}

module.exports = new TypeController()