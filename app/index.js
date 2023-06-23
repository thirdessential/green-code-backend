const express = require('express')
const bodyParser =  require("body-parser")
const users =  require("./routes/user")

const app = express()
const pino = require('pino-http')()

app.use(pino)
app.get('/', (req,res)=>{
    res.json("working fine")

})
app.use(bodyParser.json())
app.use('/api/me', users)

module.exports = app