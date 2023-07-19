const RequestTour = require('../controllers/RequestTour')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWT,RequestTour.addTour)
router.get('/',RequestTour.listTour)
router.get('/getById/:id',RequestTour.getTour)
router.get('/:id',authenticateJWT ,RequestTour.getTourByAgent)
module.exports = router
