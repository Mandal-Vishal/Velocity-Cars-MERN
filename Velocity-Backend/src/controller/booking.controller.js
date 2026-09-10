const bookingModel = require("../models/booking.model");
const carModel = require("../models/car.model");
const { sendBookingEmail } = require("../services/email.service");
const { generateInvoice } = require("../services/invoice.service");

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

    // Find car
    const car = await carModel.findById(carId);

    if (!car) {
      return res.status(404).json({
        msg: "Car not found",
      });
    }

    // Check availability
    if (!car.available) {
      return res.status(400).json({
        msg: "Car is currently unavailable",
      });
    }

    // Create booking
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

    // Generate invoice + send email
    try {
      const invoiceBuffer = await generateInvoice(booking, car);

      await sendBookingEmail({
        booking,
        car,

        subject: "Velocity - Booking Request Received",

        message:
          "Your booking request has been received successfully. The car owner will review your request and you will receive another email once your booking is confirmed.",

        invoiceBuffer,
      });
    } catch (emailError) {
      console.error("Booking email failed:", emailError);
    }

    // Send response
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

    // Send status email
    try {
      const car = await carModel.findById(booking.car);

      if (car) {
        const invoiceBuffer = await generateInvoice(booking, car);

        let subject;
        let message;

        if (status === "Confirmed") {
          subject = "Velocity - Booking Confirmed";

          message =
            "Great news! Your car rental booking has been confirmed by the car owner. Your invoice is attached to this email.";
        } else {
          subject = "Velocity - Booking Rejected";

          message =
            "Unfortunately, your car rental booking request has been rejected by the car owner.";
        }

        await sendBookingEmail({
          booking,
          car,
          subject,
          message,
          invoiceBuffer,
        });
      }
    } catch (emailError) {
      console.error("Status email failed:", emailError);
    }

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
