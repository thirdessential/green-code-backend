const db = require("../config/db");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const User = require("../services/user");
const Property = require("../services/properties");
const mongoosePaginate = require("mongoose-paginate-v2");
const HiddenProperty = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    property: [
      {
        type: String,
        ref: "Properties",
        index: true,
        required: [true],
      },
    ],
    user: {
      type: String,
      ref: "Users",
      index: true,
      required: [true],
    },
  },
  { timestamps: true }
);

HiddenProperty.plugin(mongoosePaginate);

const Model = db.model("HiddenProperty", HiddenProperty);

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
async function getByUser(_id) {
  const model = await Model.findOne({ user: _id }).populate([
    {
      path: "user",
    },
    {
      path: "property",
    },
  ]);

  return model;
}

async function listByType(body, opts = {}) {
  const { id, status } = body;
  console.log(body, "body");
  const model = await Model.findOne({ user: id }).populate([
    {
      path: "user",
    },
    {
      path: "property",
    },
  ]);
  console.log(model);
  if(model){
    if(status){
      const filteredProperty = model.property.filter(
        (item) => item.status === status
        );
        return filteredProperty;
      }
      else{
        return model.property
      }
    }
    else{
      return []
    }
}

async function create(fields) {
  const model = await getByUser(fields.user);
console.log("fields",fields)
console.log("model",model)
  if (model) {
    model.property = [...model.property, fields.property];
    await model.save();
    const userModel = await User.getById(fields.user);
    userModel.hidden_properties = model.property;
    await userModel.save();
    return userModel;
  } else {
    const newModel = new Model(fields);
    await newModel.save();
    const userModel = await User.getById(fields.user);
    userModel.hidden_properties = model.property;
    await userModel.save();
    return userModel;
  }
}

async function removeItem(body) {
  const model = await getByUser(body.user);
  const filteredModel = model.property.filter(
    (item) => item._id !== body.property
  );
  model.property = filteredModel;
  await model.save();
  const userModel = await User.getById(body.user);
  userModel.hidden_properties = model.property;
  await userModel.save();
  return userModel;
}
async function empty(id) {
  const model = await getByUser(id);
  model.property = [];
  await model.save();
  const userModel = await User.getById(id);
  userModel.hidden_properties = [];
  await userModel.save();
  return model;
}

async function getById(_id) {
  const model = await Model.findOne({ _id: _id }).populate([
    {
      path: "user",
    },
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
  edit,
  list,
  getById,
  getByUser,
  removeItem,
  empty,
  listByType,
  model: Model,
};
