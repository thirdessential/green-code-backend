const helpRequest = require('../controllers/helpRequest')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWT,helpRequest.addHelpRequest)
router.get('/',helpRequest.listHelpRequest)
router.get('/getById/:id',helpRequest.getHelpRequest)
router.put('/:id',authenticateJWT ,helpRequest.editHelpRequest)
module.exports = router
