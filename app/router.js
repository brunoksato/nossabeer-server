import Router from 'koa-router'
import UsersControllers from './controllers/users'

const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    API: 'NOSSABEER API'
  }
})

// AUTH
router.post('/public/signin', UsersControllers.signin)
router.post('/public/signup', UsersControllers.signup)

router.get('/api/users/me', UsersControllers.me)

export default router
