const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "car",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    dropLocation: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    license: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    serviceFee: {
      type: Number,
      required: true,
    },

    insurance: {
      type: Number,
      default: 0,
    },

    additionalDriver: {
      type: Number,
      default: 0,
    },

    taxes: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Rejected",
        "Cancelled",
        "Completed",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;