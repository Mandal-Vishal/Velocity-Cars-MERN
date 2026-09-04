const express = require("express");

const wishlistController = require("../controller/wishlist.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlist);

router.post(
  "/:carId",
  authMiddleware,
  wishlistController.addToWishlist
);

router.delete(
  "/:carId",
  authMiddleware,
  wishlistController.removeFromWishlist
);

module.exports = router;