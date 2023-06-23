const mongoose = require('mongoose');
let dbName
let dbString
let date = new Date().toString();
let date1 = Date.now()
let now = new Date();
let time = new Date().getTimezoneOffset();
let newmin = time % 60;
let newhrs = time / 60;
now.setHours(now.getHours() - newhrs);
now.setMinutes(now.getMinutes() - newmin);

 
   
    console.log('production')
    dbName = 'green-code-devlopment';
    dbString = `mongodb+srv://nitish3rde:Roopesh_123@thirdessntional.om9tz.mongodb.net/${dbName}?retryWrites=true&w=majority` //devesh Cluster
    mongoose.connect(
      process.env.MONGO_URI || dbString,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    
 

module.exports = mongoose;