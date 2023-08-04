const Cities = require('../controllers/Cities')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
// router.post('/',authenticateJWT,Cities.addForm)
router.get('/',Cities.listCities)
router.get('/:category',Cities.listFilteredCities)
// router.get('/:id',authenticateJWT ,Cities.getFormsByAgent)
module.exports = router
