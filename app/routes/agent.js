const agent = require('../controllers/agent')
const { authenticateJWT, authenticateJWTAdmin } = require('../middlewares.js')
const router = require('express').Router()
router.post('/',authenticateJWT,agent.addAgent)
router.get('/',agent.listAgent)
router.get('/getById/:id',agent.getAgent)
router.put('/:id',authenticateJWT ,agent.editAgent)
module.exports = router
