const Payment = require('../controllers/Payment')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()

router.get('/:id',Payment.getPaymentByProperty)
router.post('/',authenticateJWT,Payment.PayPrice)
router.post('/pay-rent',authenticateJWT,Payment.PayRent)
module.exports = router
