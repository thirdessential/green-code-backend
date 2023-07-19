// const {isEmail} = require('validator');

const db = require("../config/db");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Properties = new mongoose.Schema(
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
    seller: {
      type: String,
      ref: "Users",
      index: true,
    },
    description: {
      type: String,
    },
    noOfBeds: {
      type: Number,
      required: [true, "enter valid property beds"],
    },
    noOfBathrooms: {
      type: Number,
      required: [true, "enter valid property bath rooms"],
    },
    type: {
      type: String,
      required: [true, "enter valid property type"],
    },
    status: {
      type: String,
    },
    size: {
      type: Number,
      required: [true, "enter valid property size in sqm"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    built_in: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "enter valid property price"],
    },
    basement_fit: {
      type: Number,
    },
    garage_fit: {
      type: Number,
    },
    address: {
      fullAddress: {
        type: String,
        required: [true, "enter valid property address"],
      },
      pincode: {
        type: Number,
        required: [true, "enter valid property address pin code"],
      },
      city: {
        type: String,
        required: [true, "enter valid property city"],
      },
      country: {
        type: String,
        required: [true, "enter valid property country"],
      },

      lat: {
        type: Number,
        required: [true, "enter valid property latitue"],
      },
      long: {
        type: Number,
        required: [true, "enter valid property longitute"],
      },
    },
    images: [
      {
        type: String,
      },
    ],
    views: [
      {
        type: String,
      },
    ],
    saves: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    model: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

Properties.plugin(mongoosePaginate);

const Model = db.model("Properties", Properties);

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
async function listByType(body, opts = {}) {
  const {
    name,
    type,
    noOfBeds,
    noOfBathrooms,
    status,
    features,
    minSize,
    maxSize,
    maxprice,
    minprice,
    maxYear,
    minYear,
    city,
  } = body;
  let record = null;
  const filter = {
    $and: [
      city
        ? { "address.city": { $regex: new RegExp(city), $options: "i" } }
        : {},
      name ? { name: { $regex: new RegExp(name), $options: "i" } } : {},
      type ? { type } : {},
      features ? { features: { $in: features } } : {},
      status ? { status } : {},
      noOfBeds ? { noOfBeds: { $gte: noOfBeds } } : {},
      noOfBathrooms ? { noOfBathrooms: { $gte: noOfBathrooms } } : {},
      maxSize ? { size: { $lte: maxSize } } : {},
      minSize ? { size: { $gte: minSize } } : {},
      maxprice ? { price: { $lte: maxprice } } : {},
      minprice ? { price: { $gte: minprice } } : {},
      maxYear ? { built_in: { $lte: maxYear } } : {},
      minYear ? { built_in: { $gte: minYear } } : {},
    ],
  };

  var options = {
    lean: true,
    page: 1,
    limit: 10,
  };
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

async function getById(_id) {
  const model = await Model.findOne({ _id: _id }).populate([
    {
      path: "seller",
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
  listByType,
  model: Model,
};
