// const {isEmail} = require('validator');

const db = require('../config/db');
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
 
const Otp = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  
  username: {
    type: String,
     
  },
  type:{
    type: String,
     
  },
  otp:{
    type: String,
   
  },
  verified:{
    type:Boolean,
    default:false
  }

}, { timestamps: true })

 
const Model= db.model("Otp",Otp)


async function create(fields) {
  const model = new Model(fields);
  await model.save()
  return model;
}

async function getByUsername(username) {
  const model = await Model.findOne(
 { username: username }
  );
  return model;
}
async function deleteByUsername(username) {
    const model = await Model.deleteMany(
   { username: username }
    );
    return model;
  }
  const edit= async (id,change)=>{
    const model = await getByUsername(id);
    Object.keys(change).forEach(key => {
      model[key] = change[key]
    });
    await model.save();
    return model;
  }
  
 
module.exports = {
  create,
  edit,
  getByUsername,
  deleteByUsername,
  model: Model
}