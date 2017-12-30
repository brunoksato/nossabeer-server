import Router from 'koa-router'
import { baseApi } from 'config'
// import jwt from '../middlewares/jwt'
import UsersControllers from './controllers/users'

const router = new Router()

router.prefix(`/${baseApi}`)

// AUTH
router.post('/signin', UsersControllers.signin)
router.post('/signup', UsersControllers.signup)

// router.get('/:id', jwt, CitiesControllers.findById)
// router.post('/', jwt, CitiesControllers.add)
// router.put('/:id', jwt, CitiesControllers.update)
// router.delete('/:id', jwt, CitiesControllers.delete)

export default router
