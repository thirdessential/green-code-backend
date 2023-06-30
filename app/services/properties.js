// const {isEmail} = require('validator');

const db = require('../config/db');
const opts = { toJSON: { virtuals: true } };
const shortid = require("shortid");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Properties = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortid.generate,
    },
    name: {
        type: String,
        required: [true,"enter valid property name"],
    },
    description: {
        type: String,
    },
    noOfBeds: {
        type: Number,
        required: [true,"enter valid property beds"],
    },
    noOfBathrooms: {
        type: Number,
        required: [true,"enter valid property bath rooms"],
    },
    type: {
        type: String,
        required: [true,"enter valid property type"],
    },
    status: {
        type: String,
        default: "vacant",
        required: true,
    },
    size: {
        type: Number,
        required: [true,"enter valid property  size in sqm"],
    },
    isActive:{
        type: Boolean,
        default:true 
    },
    price:{
        type: Number,
        required: [true,"enter valid property price"],
    },
    address: {
        fullAddress: {
            type: String,
            required: [true,"enter valid property address"],
        },
        pincode: {
            type: Number,
            required: [true,"enter valid property address pin code"],
        },
        city: {
            type: String,
            required: [true,"enter valid property city"],
        },
        country: {
            type: String,
            required: [true,"enter valid property country"],
        },

        lat: {
            type: String,
            required: [true,"enter valid property latitue"],
        },
        long: {
            type: String,
            required: [true,"enter valid property longitute"],
        }
       
    },
    images: [
        {
            type: String,
            
        }
    ]
}, { timestamps: true })

Properties.plugin(mongoosePaginate);

const Model = db.model("Properties", Properties)

async function list(opts = {}) {
    let record = null;
    var options = {
        sort: { createdAt: -1 },
        lean: true,
        page: 1,
        limit: 10,
    };

    await Model.paginate({},options, async (err, result) => {
        record = result;
    });
    return record;
}
async function create(fields) {
    const model = new Model(fields);
    await model.save()
    return model;
}

async function getById(_id) {
    const model = await Model.findOne(
        { _id },
    );
    return model;
}

const edit = async (id, change) => {
    const model = await getById(id);
    Object.keys(change).forEach(key => {
        model[key] = change[key]
    });
    await model.save();
    return model;
}


module.exports = {
    create,
    edit,
    list,
    model: Model
}