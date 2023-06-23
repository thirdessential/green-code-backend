const users = require('../controllers/user.js')
const router = require('express').Router()
router.get('/', users.getUsers)
router.post("/",users.createUsers)
module.exports = router