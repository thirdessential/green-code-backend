const db = require("../config/db");
const shortid = require("shortid");
const mongoose = require("mongoose");
const Property=require('./properties')
const mongoosePaginate = require("mongoose-paginate-v2");
const Payment = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    property: {
        type: String,
        ref: "Properties",
        index: true,
        required: [true],
    },
    buyer: {
        type: String,
        ref: "Users",
        index: true,
        required: [true],
    },
    sold:{
        amount:Number,
        date:{
            type:Date,
            default:Date.now()
        }
    },
    rent:[
        {
          month:String,
          amount:Number,
          date:{
            type:Date,
            default:Date.now()
        }
        }
    ]
  },
  { timestamps: true }
);

Payment.plugin(mongoosePaginate);

const Model = db.model("Payment", Payment);

async function list(opts = {}) {
  let record = null;
  var options = {
    sort: { createdAt: -1 },
    lean: true,
    page: 1,
    limit: 10,
  };
 await Model.paginate({}, options, async (err, result) => {
    record = result;
  });
  return record;
}

async function create(fields) {
    if(Object.keys(fields).includes('sold')){
      const property=await Property.getById(fields.property)
      property.status='sold'
      await property.save()
    }
  const paymentModel = await Model.findOne({property:fields.property});
  console.log(paymentModel)
  if(!paymentModel){
    const model=new Model(fields)
    await model.save();
  }
  else{
    paymentModel.sold=fields.sold
    paymentModel.buyer-fields.buyer
    await paymentModel.save();
  }
  return paymentModel;
}
async function payRent(fields) {
    if(Object.keys(fields).includes('rent')){
      const property=await Property.getById(fields.property)
      property.status='on rent'
      await property.save()
    }
    var paymentModel=await Model.findOne({property:fields.property})
    if(!paymentModel){
        const model = new Model(fields);
        await model.save();
        return model;
    }
    else{
     console.log("fields",fields.rent)
     paymentModel.rent=[...paymentModel.rent,fields.rent]
     await paymentModel.save()
     return paymentModel
    }
}

async function getById(_id) {
  const model = await Model.findOne({ _id: _id }).populate([
    {
      path: "property",
    },
  ]);

  return model;
}
async function getByPropertyId(_id) {
  const model = await Model.findOne({ property: _id }).populate([
    {
      path: "property",
    },
  ]);

  return model;
}
const edit = async (id, change) => {
    const model = await getById(id);
    Object.keys(change).forEach((key) => {
      model[key] = change[key];
    });
    await model.save();
  
    return model;
  };


module.exports = {
  create,
  payRent,
  list,
  getById,
  getByPropertyId,
  model: Model,
};
