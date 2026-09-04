const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type:{
      type:String,
      required:true
    },
    fuel:{
        type:String,
        required:true
    },
    transmission:{
        type:String,
        required:true
    },
    location: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    seats:{
      type:Number,
      required:true
    },
    available: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const carModel = mongoose.model("car", carSchema);

module.exports = carModel;
