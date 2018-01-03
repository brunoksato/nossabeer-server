import Router from 'koa-router'
import UsersControllers from './controllers/users'
import SellersControllers from './controllers/sellers'

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

export default router
