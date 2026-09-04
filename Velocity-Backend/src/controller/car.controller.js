const imagekit = require("../config/imagekit");
const carModel = require("../models/car.model");

const addCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      type,
      seats,
      pricePerDay,
      location,
      fuel,
      transmission,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        msg: "Car image is required",
      });
    }

    const imagefile = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    const car = await carModel.create({
      brand,
      model,
      year,
      type,
      seats,
      pricePerDay,
      location,
      fuel,
      transmission,
      image: imagefile.url,
      owner: req.user._id,
    });

    return res.status(201).json({
      msg: "Car added successfully",
      car,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to add car",
    });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await carModel.find();

    return res.status(200).json({
      cars,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to fetch cars",
    });
  }
};
const getCarById = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json({
      car,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch car",
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await carModel.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!car) {
      return res.status(404).json({
        msg: "Car not found or you are not the owner",
      });
    }

    await carModel.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "Car deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Failed to delete car",
    });
  }
};

module.exports = {
  addCar,
  getCars,
  getCarById,
  deleteCar,
};