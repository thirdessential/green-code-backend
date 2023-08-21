// const {isEmail} = require('validator');

const db = require("../config/db");
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const PriceHistory = require("./PriceHistory");
const mongoosePaginate = require("mongoose-paginate-v2");
const cities = require("./cities");
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
      default: "Sale",
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
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "enter valid property price"],

    },
    tax: {
      type: Number,
      default:0
    },
    monthly_price: {
      type: Number,
      default:0

    },
    basement_fit: {
      type: Number,
      default:0

    },
    noOfGarage: {
      type: Number,
      default:0
  
    },
    garage_fit: {
      type: Number,
      default:0

    },
    likes: {
      type: Number,
      default: 0,
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
        required: true,
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
        required: true,
      },
    ],
    model: {
      type: String,
    },
    url: {
      type: String,
    },
    agent: {
      type: String,
      ref: "Agent",
      index: true,
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
const getAddressType = (value) => {
  const cityRegex = /^[a-zA-Z\s-]+$/;
  const pincodeRegex = /^\d+$/;
  if (cityRegex.test(value)) {
    return "address.city";
  } else if (pincodeRegex.test(value)) {
    return "address.pincode";
  } else {
    return "address.fullAddress";
  }
};
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
    lat,
    long,
  } = body;
  console.log(body.features,"body")
  var addressType = getAddressType(city);
 
  let record = null;
  var filter
  if (addressType === "address.pincode") {
   filter = {
    $and: [
      city
        ? { [addressType]: city }
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
      body.maxYear ? { built_in: { $lte: maxYear } } : {},
      body.minYear ? { built_in: { $gte: minYear } } : {},
      lat ? { "address.lat": { $gte: lat - 10, $lte: lat + 10 } } : {},
      long ? { "address.long": { $gte: long - 10, $lte: long + 10 } } : {},
    ],
  };
}
else{
  filter = {
    $and: [
      city
        ? { [addressType]: {$regex: new RegExp(city), $options: "i"} }
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
      body.maxYear ? { built_in: { $lte: maxYear } } : {},
      body.minYear ? { built_in: { $gte: minYear } } : {},
      lat ? { "address.lat": { $gte: lat - 10, $lte: lat + 10 } } : {},
      long ? { "address.long": { $gte: long - 10, $lte: long + 10 } } : {},
    ],
  };
}

  var options = {
    lean: true,
    page: 1,
    limit: 20,
  };
  await Model.paginate(filter, options, async (err, result) => {
    record = result;
  });
  return record;
}
async function suggestedProp(body, opts = {}) {
  const { city } = body;
  var addressType = getAddressType(city);
  console.log(addressType);
  let record = null;
  var filter;
  if (addressType === "address.pincode") {
    filter = {
      $and: [city ? { [addressType]: city } : {}],
    };
  } else {
    filter = {
      $and: [
        city
          ? { $or: [
            { "address.city": {$regex: new RegExp(city), $options: "i"} },
            { "address.fullAddress": { $regex: new RegExp(city, "i") } }
          ]}
          : {},
      ],
    };
  }

  var options = {
    lean: true,
    page: 1,
    limit: 20,
  };
  await Model.paginate(filter, options, async (err, result) => {
    record = result;
  });
  return record;
}
async function create(fields) {
  const model = new Model(fields);
  await model.save();
  const data = {
    property: model._id,
    history: {
      price: model.price,
      tax: model.tax,
      monthly_price: model.monthly_price,
    },
  };
  PriceHistory.create(data);
  const cityData = {
    name: model.address.city,
    category: model.status,
  };
  console.log(cityData);
  const cityModel = await cities.list();
  const cityDocs = cityModel.docs.filter((item) => item.name === cityData.name);
  if (cityDocs.length === 0) {
    cities.create(cityData);
  }

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
  if (
    Object.keys(change).includes("price") ||
    Object.keys(change).includes("tax") ||
    Object.keys(change).includes("monthly_price")
  ) {
    const priceHistoryModel = await PriceHistory.getByPropertyId(id);

    priceHistoryModel.history = [
      ...priceHistoryModel.history,
      {
        price: change.price ? change.price : "",
        tax: change.tax ? change.tax : "",
        monthly_price: change.monthly_price ? change.monthly_price : "",
      },
    ];
    await priceHistoryModel.save();
  }
  return model;
};
const remove = async (id) => {
  const model = await getById(id);
  await Model.deleteOne(model);
};

module.exports = {
  create,
  edit,
  list,
  getById,
  listByType,
  remove,
  suggestedProp,
  model: Model,
};
