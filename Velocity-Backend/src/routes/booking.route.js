const express = require("express");

const bookingController = require("../controller/booking.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const ownerMiddleware = require("../middlewares/owner.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  bookingController.createBooking
);

router.get(
  "/renter",
  authMiddleware,
  bookingController.getRenterBookings
);

router.get(
  "/owner",
  authMiddleware,
  ownerMiddleware,
  bookingController.getOwnerBookings
);

router.patch(
  "/:id/status",
  authMiddleware,
  ownerMiddleware,
  bookingController.updateBookingStatus
);

module.exports = router;