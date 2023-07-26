const db = require("../config/db");
const { isEmail } = require("validator");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const Property = require("./properties");
const mongoosePaginate = require("mongoose-paginate-v2");
const Agent = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    name: {
      type: String,
      required: [true, "enter valid property name"],
    },
    user: {
      type: String,
      ref: "Users",
      index: true,
      required: [true],
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      unique: [true, "user already registered with this number"],
      sparse: true,
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: [true, " user already registered with this email"],
      sparse: true,
      validate: [isEmail, "invalid email"],
    },
    organization_size: {
      type: String,
    },
    properties: [
      {
        type: String,
        ref: "Properties",
        index: true,
      },
    ],
  },
  { timestamps: true }
);

Agent.plugin(mongoosePaginate);

const Model = db.model("Agent", Agent);

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
async function takeProperty(fields) {
  const model = await Model.findOne({ _id: fields._id });
  model.properties = [...model.properties, fields.property];
  await model.save();
  const propertyModel = await Property.getById({ _id: fields.property });
  propertyModel.agent = fields._id;
  await propertyModel.save();
  return model;
}

async function getById(_id) {
  const model = await Model.findOne({ _id: _id }).populate([
    {
      path: "user",
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
  edit,
  list,
  getById,
  takeProperty,
  model: Model,
};
