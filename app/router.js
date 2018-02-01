import Router from 'koa-router'
import UsersControllers from './controllers/users'
import SellersControllers from './controllers/sellers'
import ProductsControllers from './controllers/products'
import ProductReviewControllers from './controllers/products_reviews'
import PlacesControllers from './controllers/places'
import CountriesControllers from './controllers/countries'
import StateControllers from './controllers/states'

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

// PRODUCTS REVIEW
router.get('/public/products_reviews', ProductReviewControllers.list)
router.get('/public/products_reviews/:id', ProductReviewControllers.get)
router.post('/api/products_reviews', ProductReviewControllers.create)
router.put('/api/products_reviews/:id', ProductReviewControllers.update)
router.delete('/api/products_reviews/:id', ProductReviewControllers.delete)

// PLACES
router.get('/public/places', PlacesControllers.list)
router.get('/public/places/:id', PlacesControllers.get)
router.post('/api/places', PlacesControllers.create)
router.put('/api/places/:id', PlacesControllers.update)
router.delete('/api/places/:id', PlacesControllers.delete)

// COUNTRIES
router.get('/public/countries', CountriesControllers.list)
router.get('/public/countries/:id', CountriesControllers.get)
router.post('/api/countries', CountriesControllers.create)
router.put('/api/countries/:id', CountriesControllers.update)
router.delete('/api/countries/:id', CountriesControllers.delete)

// STATE
router.get('/public/states', StateControllers.list)
router.get('/public/states/:id', StateControllers.get)
router.post('/api/states', StateControllers.create)
router.put('/api/states/:id', StateControllers.update)
router.delete('/api/states/:id', StateControllers.delete)

export default router
