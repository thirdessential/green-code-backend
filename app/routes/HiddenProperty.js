const Hidden = require('../controllers/HiddenProperty')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWT,Hidden.addHidden)
router.get('/',Hidden.listHidden)
router.get('/getById/:id',Hidden.getHidden)
router.get('/getByUser/:user',Hidden.getHiddenByUser)
router.get('/getByType',Hidden.listHiddenByType)
router.put('/removeItem',authenticateJWT ,Hidden.removeProperty)
router.put('/emptyHidden',authenticateJWT ,Hidden.emptyHidden)
module.exports = router