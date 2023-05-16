const ApiError = require('../error/ApiError')
const db = require("../db");

const formatDate = () => {
    let date = new Date()
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}
class OrderController {

    async createOrder(req, res) {
        const user = req.user
        let {productsInOrder, phone_number} = req.body
        try {
            productsInOrder = JSON.parse(productsInOrder)
            let price = 0
            {
                productsInOrder.map(item =>
                    price += item.price
                )
            }
            await db.query('BEGIN');
            try {
                    // Выполняем первый запрос
                    const order = await db.query('INSERT INTO orders (user_id, created_at, phone_number, price, status) values ($1, $2, $3, $4, $5) returning *', [user.id, formatDate(), phone_number, price, 'В обработке']);
                    // Выполняем второй запрос
                    for (let i = 0; i <productsInOrder.length; i++) {
                        await db.query(`INSERT INTO order_product (order_id, product_id) values ($1,$2)`, [order.rows[0].id, productsInOrder[i].product_id]);
                    }
                    // Выполняем третий запрос
                    await db.query('DELETE FROM basket_product WHERE basket_id IN (SELECT id FROM basket WHERE user_id = $1)', [user.id]);
                    // Если все запросы выполнены успешно, то фиксируем транзакцию
                    await db.query('COMMIT');
                    return res.json(order.rows[0])

            } catch (err) {
                console.error(err);
                //если нет, то откатываем транзакцию
                await db.query('ROLLBACK');
                return res.status(500).json({message: 'Internal server error'});
            }
        }catch (error){
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async getProductsFromOrder(req, res) {
        const {id} = req.body;
        try {
            const order = await db.query(`SELECT p.*
                                      FROM products p
                                      JOIN order_product op ON p.id = op.product_id
                                      WHERE op.order_id = $1;`, [id]);
            return res.json(order.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async getAllOnUser(req, res) {
        const user = req.user
        try {
            const orders = await db.query('SELECT * FROM orders WHERE user_id = $1', [user.id])
            return res.json(orders.rows)
        }catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }


    }

    async getAllOnAdmin(req, res) {
        try {
            const orders = await db.query('SELECT * FROM orders')
            return res.json(orders.rows)

        }catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async updateOrderStatus(req, res){
        console.log('Зашел в функцию')
        const {status, id} = req.body;
        console.log(req.body)
        try {
            const order = await db.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id])
            return res.json(order.rows[0])
        }catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }


}

module.exports = new OrderController()