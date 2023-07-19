const ContactForm = require('../controllers/ContactForm')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWT,ContactForm.addForm)
router.get('/',ContactForm.listForm)
router.get('/getById/:id',ContactForm.getForm)
router.get('/:id',authenticateJWT ,ContactForm.getFormsByAgent)
module.exports = router
