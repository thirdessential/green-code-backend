// const {isEmail} = require('validator');

const db = require('../config/db');
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { isEmail } = require("validator")
const User = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email']
  },
  emailVerified: {
    type: Boolean,
    default:false
     
     
  },
  phoneVerified: {
    type: Boolean,
    default:false
     
     
  },

  phone: {
    type: String,
    unique: true,
    required: true,

  },
  userType: {
    type: String,
    required: true,
    enum: ["buyer", "seller","admin"]

  },
  profession: {
    type: String,
     default:""

  },
  address: {
    type: String,
    default:""
  },
  
  role:{
    type: String,
    default:"individual",
    enum: ["enterprise", "individual"]
  },
  password:{
    type: String,
    required: true
  },
  package:{
    type: String,
    required: true
  },
  paymentMode:{
    type: String,
    required: true
  },
  enterpriseName:{
    type: String,
    required: true
  },
  registrationNumber:{
    type: String,
    required: true
  }

}, { timestamps: true })

User.plugin(mongoosePaginate);
const Model= db.model("Users",User)

// const initialRoles = [
//  {name:"admin", email:"admin@greenCode.com", emailVerified:true,}
   
// ];
// Model.countDocuments((err, count) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   if (count === 0) {
//     Model.insertMany(initialRoles, (err, roles) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log(`${roles.length} roles have been created.`);
//     });
//   } else {
//     console.log('Roles already exist.');
//   }
// });

async function create(fields) {
  const existingModel = await getById(fields._id);
  if (existingModel) return existingModel;

  const model = new Model(fields);
  if (fields.password)
    await hashPassword(model);
  await model.save()
  return model;
}

module.exports = {
  create,
  model: Model
}