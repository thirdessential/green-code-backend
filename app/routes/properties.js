const properties = require('../controllers/properties.js')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
// router.get('/',authenticateJWT, users.getMe)
router.post('/',authenticateJWTAdmin,properties.addProperties)
router.get('/',properties.listProperties)
router.put('/:id',authenticateJWTAdmin ,properties.editProperties)
module.exports = router
