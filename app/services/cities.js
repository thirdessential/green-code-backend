const db = require("../config/db");
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Cities = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

Cities.plugin(mongoosePaginate);

const Model = db.model("Cities", Cities);

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
async function listByCategory( category,opts = {}) {
  let record = null;
  var options = {
    sort: { createdAt: -1 },
    lean: true,
    page: 1,
    limit: 10,
  };
console.log(category)
  const filter = { $and: [category ? { category } : {}] };
  await Model.paginate(filter, options, async (err, result) => {
    record = result;
  });
  return record;
}

async function create(fields) {
  const model = new Model(fields);
  await model.save();
  return model;
}

module.exports = {
  create,
  list,
  listByCategory,
  model: Model,
};
