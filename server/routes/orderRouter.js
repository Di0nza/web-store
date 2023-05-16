const Router = require('express')
const router = new Router()
const orderController = require('../controller/orderController') // импорт реализации функционала для роутера
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', authMiddleware, orderController.createOrder)
router.post('/:id',authMiddleware, orderController.getProductsFromOrder)
router.post('/admin/:id',checkRole('ADMIN'), orderController.updateOrderStatus)
router.get('/',authMiddleware, orderController.getAllOnUser)
router.get('/admin', checkRole('ADMIN'), orderController.getAllOnAdmin)



module.exports = router