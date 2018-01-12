import Router from 'koa-router'
import UsersControllers from './controllers/users'
import SellersControllers from './controllers/sellers'
import ProductsControllers from './controllers/products'

const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    API: 'NOSSABEER API'
  }
})

// AUTH
router.post('/public/signin', UsersControllers.signin)
router.post('/public/signup', UsersControllers.signup)

// USERS
router.get('/api/users/me', UsersControllers.me)

// SELLERS
router.get('/public/sellers', SellersControllers.list)
router.get('/public/sellers/:id', SellersControllers.get)
router.post('/api/sellers', SellersControllers.create)
router.put('/api/sellers/:id', SellersControllers.update)
router.delete('/api/sellers/:id', SellersControllers.delete)

// PRODUCTS
router.get('/public/products', ProductsControllers.list)
router.get('/public/products/:id', ProductsControllers.get)
router.post('/api/products', ProductsControllers.create)
router.put('/api/products/:id', ProductsControllers.update)
router.delete('/api/products/:id', ProductsControllers.delete)

export default router
