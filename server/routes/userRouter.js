const Router = require('express')
const router = new Router()
const userController = require('../controller/userController') // импорт реализации функционала для роутера
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)


module.exports = router