// const {isEmail} = require('validator');

const db = require("../config/db");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Roles = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    role_name: {
      type: String,
      
    },
    role_type: {
      type: String,
      enum:["superadmin","admin","user"]
    },  
  },
  { timestamps: true }
);

Roles.plugin(mongoosePaginate);

const Model = db.model("Roles", Roles);

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
  const model = new Model(fields);
  await model.save();
  return model;
}

async function getById(_id) {
  const model = await Model.findOne({ _id: _id })
  console.log("getbyid", model);
  return model;
}
async function getByType(type) {
  const model = await Model.find({ role_type: type })
  console.log("getbytype", model);
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
  edit,
  list,
  getById,
  getByType,
  model: Model,
};
