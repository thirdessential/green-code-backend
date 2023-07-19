// const {isEmail} = require('validator');

const db = require("../config/db");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Search = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    name: {
      type: String,
    },
    user: {
      type: String,
      ref: "Users",
      index: true,
      required: [true],
    },
    noOfBeds: {
      type: Number,
    },
    noOfBathrooms: {
      type: Number,
    },
    type: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
    },
    maxSize: {
      type: String,
    },
    minSize: {
      type: String,
    },
    maxYear: {
      type: Number,
    },
    minYear: {
      type: String,
    },
    minPrice: {
      type: String,
    },
    maxPrice: {
      type: String,
    },
    features: [
      {
        type: String,
      },
    ]
  },
  { timestamps: true }
);

Search.plugin(mongoosePaginate);

const Model = db.model("Search", Search);

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

async function create(fields,id) {
  fields.user=id
  // console.log(fields)
  const model = new Model(fields);
  await model.save();
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
async function getByUser(_id) {
  const model = await Model.findOne({user: _id }).populate([
    {
      path: "user",
    },
  ]);

  return model;
}



module.exports = {
  create,
  list,
  getById,
  getByUser,
  model: Model,
};
