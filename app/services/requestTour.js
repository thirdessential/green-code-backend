const db = require("../config/db");
const { isEmail } = require("validator");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Tour = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    user: {
      type: String,
      ref: "Users",
      index: true,
      required: [true],
    },
    agent: {
      type: String,
      ref: "Agent",
      index: true,
      required: [true],
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    mode: {
      type: String,
    },
  },
  { timestamps: true }
);

Tour.plugin(mongoosePaginate);

const Model = db.model("Tour", Tour);

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
      path: "user",
    },
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
    {
      path: "user",
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
