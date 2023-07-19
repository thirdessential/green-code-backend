// const {isEmail} = require('validator');

const db = require("../config/db");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { isEmail } = require("validator");
const { hashPassword, hashChangePassword } = require("../utility");
const User = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: [true, " user already registered with this email"],
      sparse: true,
      validate: [isEmail, "invalid email"],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
      trim: true,
      index: true,
      unique: [true, " user already registered with this number"],
      sparse: true,
    },
    profession: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    role: { type: String, ref: "Roles", index: true, required: [true] },
    password: {
      type: String,
    },
    package: {
      type: String,
    },
    paymentMode: {
      type: String,
    },
    enterpriseName: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    provider: {
      type: String,
      default: "default",
    },
    uid: {
      type: String,
    },
    liked_properties:[
      {
        type:String
      }
    ]
  },
  { timestamps: true }
);

User.plugin(mongoosePaginate);

const Model = db.model("Users", User);

async function create(fields) {
  const model = new Model(fields);
  if (fields.password) await hashPassword(model);
  await model.save();
  return model;
}
async function getById(_id) {
  console.log(_id)
  const model = await Model.findOne({ _id }).populate([
    {
      path: "role",
    },
  ]);;
  return model;
}
async function getUserByUsername(username) {
  const model = await Model.findOne({
    $or: [{ phone: username }, { email: username }],
  });
  return model;
}

const edit = async (id, change) => {
  const model = await getById(id);

  if (change.password) {
    await hashChangePassword(change);
  }
  Object.keys(change).forEach((key) => {
    model[key] = change[key];
  });
  await model.save();
  return model;
};

module.exports = {
  create,
  getUserByUsername,
  edit,
  getById,
  model: Model,
};
