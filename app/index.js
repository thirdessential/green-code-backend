const express = require('express')
const bodyParser =  require("body-parser")
const users =  require("./routes/user")
const cors = require('cors');
const app = express()
const pino = require('pino-http')()
const multer = require("multer");
const upload = require('./config/multer');
const properties = require('./routes/properties.js');
const roles = require('./routes/role');
const agent = require('./routes/agent');
const Faqs = require('./routes/faqs');
const Articles = require('./routes/Articles');
const Search = require('./routes/Search');
const helpRequest = require('./routes/helpRequest');
const favourite = require('./routes/favourite')
const ContactForm = require('./routes/ContactForm');
const requestTour = require('./routes/RequestTour');
const priceHistory = require('./routes/PriceHistory');
const payment = require('./routes/Payment');
const cities = require('./routes/Cities');
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Allow all methods and headers
app.use(cors({
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));
app.use('/public',express.static(__dirname + '/public'));
app.use(pino)
app.get('/', (req,res)=>{
    res.json("working fine")

})
app.use(bodyParser.json())
app.use('/api/v1/me', users)
app.use('/api/v1/properties',properties )
app.use('/api/v1/role',roles )
app.use('/api/v1/agent',agent )
app.use('/api/v1/favourite',favourite )
app.use('/api/v1/faqs',Faqs )
app.use('/api/v1/articles',Articles )
app.use('/api/v1/search',Search)
app.use('/api/v1/help-request',helpRequest )
app.use('/api/v1/contactForm',ContactForm )
app.use('/api/v1/requestTour',requestTour )
app.use('/api/v1/Pricehistory',priceHistory )
app.use('/api/v1/Payment',payment )
app.use('/api/v1/cities',cities )
app.post("/api/v1/single", upload.single("image"), (req, res) => {
    if (req.file) {
      res.send({sttaus:"Single file uploaded successfully",file:req.file});
    } else {
      res.status(400).send("Please upload a valid image");
    }
  })
module.exports = app