const db = require("../config/db");
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Articles = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    title: {
      type: String,
    },
    user: {
      type: String,
      ref: "Users",
      index: true,
      required: [true],
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    image:{
        type:String
    }
  },
  { timestamps: true }
);

Articles.plugin(mongoosePaginate);

const Model = db.model("Articles", Articles);

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
  model: Model,
};
