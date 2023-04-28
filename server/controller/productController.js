const uuid = require('uuid') // генерирует рандомные неповторяющиеся айди
const path = require('path')
const ApiError = require('../error/ApiError')
const {Product, ProductInfo} = require('../models/models')

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, description, brandId, typeId, availability, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName)) // перемещаем файл в папку статик
            const product = await Product.create({
                name,
                price,
                description,
                brandId,
                typeId,
                availability,
                img: fileName
            })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: i.productId
                }))
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        } else if (brandId && !typeId) {
            products = await Product.findAndCountAll({where: {brandId}, limit, offset})
        } else if (!brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        } else if (brandId && typeId) {
            products = await Product.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as:'info'}]
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductController()