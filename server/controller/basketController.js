const ApiError = require('../error/ApiError')
const db = require("../db");
class BrandController {
    async addToBasket(req,res,next){
        const user = req.user
        const {product_id} = req.body
        const basket_id = await db.query('SELECT id FROM basket WHERE user_id = $1', [user.id])
        const basket = await db.query('INSERT INTO basket_product (basket_id, product_id) values ($1,$2) returning *', [basket_id.rows[0].id, product_id])
        return res.json(basket.rows[0])
    }

    async getBasketUser(req,res){
        const {id} = req.user
        console.log('user' + id)
        // const basket = await BasketDevice.findAll({include: {
        //         model: Device
        //     }, where: {basketId: id}})
        const basket = await db.query('SELECT * FROM products LEFT JOIN basket_product ON products.id = basket_product.product_id WHERE basket_product.basket_id = $1', [id])
        if(!basket) res.status(400).json('None Id')
        console.log(basket.rows)
        return res.json(basket.rows)
    }

    async deleteFromBasket (req, res) {
        const {id} = req.body
        console.log('delete ' +id)
        if(!id) res.status(400).json('None Id')
        await db.query('DELETE FROM basket_product WHERE id = $1', [id])
        res.status(200).json('Product deleted')
    }
}

module.exports = new BrandController()