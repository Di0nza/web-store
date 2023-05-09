const uuid = require('uuid') // генерирует рандомные неповторяющиеся айди
const path = require('path')
const ApiError = require('../error/ApiError')
const db = require("../db");

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, description, brand_id, type_id, availability, info} = req.body
            const {img} = req.files
            console.log(info)
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName)) // перемещаем файл в папку статик
            const product = await db.query(
                `INSERT INTO products (name, price, description, brand_id, type_id, availability, img) values ($1,$2,$3,$4,$5,$6,$7) returning *`,
                [name, price, description, brand_id, type_id, availability, fileName]
            )
            if (info) { //TODO не работает
                info = JSON.parse(info)

                info.forEach(i =>
                    db.query(`INSERT INTO product_info (title, description, product_id) values ($1,$2,$3)`, [i.title, i.description, product.rows[0].id]
                    ))
            }
            return res.json(product.rows[0])
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brand_id, type_id, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products
        if (!brand_id && !type_id) {
            products = await db.query(`SELECT * FROM products OFFSET ($1) ROWS LIMIT $2`, [offset, limit])
        } else if (brand_id && !type_id) {
            products = await db.query(`SELECT * FROM products WHERE brand_id = $1 OFFSET ($2) ROWS LIMIT $3`, [brand_id, offset, limit])
        } else if (!brand_id && type_id) {
            products = await db.query(`SELECT * FROM products WHERE type_id = $1 OFFSET ($2) ROWS LIMIT $3`, [type_id, offset, limit])
        } else if (brand_id && type_id) {
            products = await db.query(`SELECT * FROM products WHERE brand_id = $1 AND type_id = $2 OFFSET ($3) ROWS LIMIT $4`, [brand_id, type_id, offset, limit])
        }
        return res.json(products.rows)
    }

    async getOne(req, res) {
        const id = req.params.id;
        try {
            const product = await db.query(`SELECT * FROM products WHERE id = $1`, [id]); //SELECT * FROM products LEFT JOIN product_info ON products.id = product_info.product_id WHERE products.id = $1
            return res.json(product.rows[0]);//TODO Написать адекватный запрос
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ProductController()