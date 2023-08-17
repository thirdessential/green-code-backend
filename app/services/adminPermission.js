const db = require("../config/db");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const AdminPermission = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    mainImg: {
      type: String,
    },
    mainHeadline: {
      type: String,
    },
    buyhome_bgImage: {
      type: String,
    },
    sellhome_bgImage: {
      type: String,
    },
    renthome_bgImage: {
      type: String,
    },
    footer_desc: {
      type: String,
    },
  },
  { timestamps: true }
);

AdminPermission.plugin(mongoosePaginate);

const Model = db.model("AdminPermission", AdminPermission);

async function list(opts = {}) {
    const model = await Model.findOne();
    return model 
}

async function create(fields) {
  var model;
  const isModel = await Model.find();
 
  if (isModel.length === 0) {
    model = new Model(fields);
    await model.save();
  } else {
    model = await Model.findOne({ _id: isModel[0]._id });
    Object.keys(fields).forEach((key) => {
      model[key] = fields[key];
    });
    await model.save();
  }
  return model;
}

module.exports = {
  create,
  list,
  model: Model,
};
