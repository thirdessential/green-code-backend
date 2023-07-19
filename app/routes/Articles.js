const Articles = require('../controllers/Articles')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWT,Articles.addArticles)
router.get('/',Articles.listArticles)
router.get('/getById/:id',Articles.getArticles)
router.put('/:id',authenticateJWT ,Articles.editArticles)
module.exports = router
