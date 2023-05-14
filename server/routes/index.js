const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const basketRouter = require('./basketRouter')



router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)

module.exports = router