const userModel = require('../models/user.model')
const carModel = require('../models/car.model')

const getWishlist = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("wishlist");

    return res.status(200).json({
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to fetch wishlist",
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await carModel.findById(carId);

    if (!car) {
      return res.status(404).json({
        msg: "Car not found",
      });
    }

    const user = await userModel.findById(req.user._id);

    const alreadySaved = user.wishlist.some(
      (id) => id.toString() === carId
    );

    if (alreadySaved) {
      return res.status(200).json({
        msg: "Car already in wishlist",
      });
    }

    user.wishlist.push(carId);

    await user.save();

    return res.status(200).json({
      msg: "Car added to wishlist",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to add car to wishlist",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { carId } = req.params;

    const user = await userModel.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== carId
    );

    await user.save();

    return res.status(200).json({
      msg: "Car removed from wishlist",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to remove car from wishlist",
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};