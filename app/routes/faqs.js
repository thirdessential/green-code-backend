const Faqs = require('../controllers/faqs')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWT,Faqs.addFaqs)
router.get('/',Faqs.listFaqs)
router.get('/getById/:id',Faqs.getFaqs)
router.put('/:id',authenticateJWT ,Faqs.editFaqs)
module.exports = router
