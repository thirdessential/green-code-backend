const db = require("../config/db");
const { isEmail } = require("validator");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const ContactForm = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    name: {
      type: String,
      required: [true],
    },
    agent: {
      type: String,
      ref: "Agent",
      index: true,
      required: [true],
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
    },
    email: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
      validate: [isEmail, "invalid email"],
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

ContactForm.plugin(mongoosePaginate);

const Model = db.model("ContactForm", ContactForm);

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
  const model = await Model.findOne({ _id: _id }).populate([
    {
      path: "agent",
    },
  ]);

  return model;
}

const getByAgent = async (id) => {
  const model = await Model.find({ agent: id }).populate([
    {
      path: "agent",
    },
  ]);

  return model;
};

module.exports = {
  create,
  getByAgent,
  list,
  getById,
  model: Model,
};
