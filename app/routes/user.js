const users = require('../controllers/user.js')
const { authenticateJWT } = require('../middlewares.js')
const router = require('express').Router()
router.get('/',authenticateJWT, users.getMe)
router.post('/',users.createUser)
router.post('/login',users.login)
router.post('/sentOtp',users.sendOtp)
router.post('/verifyOtp',users.verifyOtp)
router.post('/socialAuth',users.socialAuth)
router.post('/sentResetOtp',users.sendOtpResetPassword)
router.post('/newPassword',users.newPassword)

router.put('/',authenticateJWT ,users.updateUser)
module.exports = router
 