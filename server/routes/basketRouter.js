const Router = require('express')
const router = new Router()
const basketController = require('../controller/basketController') // импорт реализации функционала для роутера
const checkRole = require('../middleware/checkRoleMiddleware')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)
router.post('/delete/:id', authMiddleware, basketController.deleteFromBasket)

module.exports = router