const adminPermission = require('../controllers/AdminPermission')
const { authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWTAdmin,adminPermission.addPermission)
router.get('/',adminPermission.listPermission)
module.exports = router
