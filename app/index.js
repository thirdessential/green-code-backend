const express = require('express')
const bodyParser =  require("body-parser")
const users =  require("./routes/user")
const cors = require('cors');
const app = express()
const pino = require('pino-http')()
const multer = require("multer");
const upload = require('./config/multer');
const properties = require('./routes/properties.js');
app.use(cors());
app.use('/public',express.static(__dirname + '/public'));
app.use(pino)
app.get('/', (req,res)=>{
    res.json("working fine")

})
app.use(bodyParser.json())
app.use('/api/v1/me', users)
app.use('/api/v1/properties',properties )
app.post("/api/v1/single", upload.single("image"), (req, res) => {
    if (req.file) {
      res.send({sttaus:"Single file uploaded successfully",file:req.file});
    } else {
      res.status(400).send("Please upload a valid image");
    }
  })
module.exports = app