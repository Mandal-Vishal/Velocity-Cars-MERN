const bookingModel = require("../models/booking.model");
const carModel = require("../models/car.model");

const createBooking = async (req, res) => {
  try {
    const {
      carId,
      pickupLocation,
      dropLocation,
      pickupDate,
      returnDate,
      firstName,
      lastName,
      email,
      phone,
      license,
      days,
      subtotal,
      serviceFee,
      insurance,
      additionalDriver,
      taxes,
      total,
      paymentMethod,
    } = req.body;

    const car = await carModel.findById(carId);

    if (!car) {
      return res.status(404).json({
        msg: "Car not found",
      });
    }

    if (!car.available) {
      return res.status(400).json({
        msg: "Car is currently unavailable",
      });
    }

    const booking = await bookingModel.create({
      renter: req.user._id,
      car: car._id,
      owner: car.owner,

      pickupLocation,
      dropLocation,
      pickupDate,
      returnDate,

      firstName,
      lastName,
      email,
      phone,
      license,

      days,
      subtotal,
      serviceFee,
      insurance,
      additionalDriver,
      taxes,
      total,

      paymentMethod,

      status: "Pending",
    });

    return res.status(201).json({
      msg: "Booking request sent successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to create booking",
    });
  }
};


const getRenterBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ renter: req.user._id })
      .populate("car")
      .populate("owner", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to fetch bookings",
    });
  }
};


const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ owner: req.user._id })
      .populate("car")
      .populate("renter", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to fetch owner bookings",
    });
  }
};


const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Confirmed", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        msg: "Invalid booking status",
      });
    }

    const booking = await bookingModel.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        msg: "Booking not found",
      });
    }

    if (booking.status !== "Pending") {
      return res.status(400).json({
        msg: "Only pending bookings can be updated",
      });
    }

    booking.status = status;

    await booking.save();

    return res.status(200).json({
      msg: `Booking ${status.toLowerCase()} successfully`,
      booking,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to update booking",
    });
  }
};

module.exports = {
  createBooking,
  getRenterBookings,
  getOwnerBookings,
  updateBookingStatus,
};