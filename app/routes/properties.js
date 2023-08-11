const properties = require('../controllers/properties.js')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
// router.get('/',authenticateJWT, users.getMe)
router.post('/',authenticateJWT,properties.addProperties)
router.get('/',properties.listProperties)
router.get('/getByType',properties.listPropertiesByType)
router.get('/getById/:id',properties.getProperty)
router.delete('/:id',authenticateJWTAdmin,properties.deleteProperty)
router.get('/nearby-schools',properties.getNearBySchools)
// router.get('/priceValuation',properties.priceEvaluation)
router.put('/:id',authenticateJWT ,properties.editProperties)
module.exports = router
