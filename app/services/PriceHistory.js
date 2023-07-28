const db = require("../config/db");
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const PriceHistory = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    property: {
        type: String,
        ref: "Properties",
        index: true,
        required: [true],
    },
    history:[
        {
            price:Number,
            tax:Number,
            monthly_price:Number,
            date:{
                type:Date,
                default:Date.now()
            }
        }
    ]
  },
  { timestamps: true }
);

PriceHistory.plugin(mongoosePaginate);

const Model = db.model("PriceHistory", PriceHistory);

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
      path: "property",
    },
  ]);

  return model;
}
async function getByPropertyId(_id) {
  const model = await Model.findOne({ property: _id }).populate([
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
  getByPropertyId,
  model: Model,
};
