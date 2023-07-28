const PriceHistory = require('../controllers/PriceHistory')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()

router.get('/:id',PriceHistory.getPriceHistoryByProperty)
module.exports = router
