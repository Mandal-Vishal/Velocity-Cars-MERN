const express = require('express')

const carController  = require('../controller/car.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const ownerMiddleware = require('../middlewares/owner.middleware')
const upload = require('../middlewares/upload.middleware')

const router = express.Router()

router.post('/' , authMiddleware , ownerMiddleware , upload.single('image'), carController.addCar)
router.get('/' , carController.getCars)
router.delete("/:id", authMiddleware,ownerMiddleware,carController.deleteCar);
router.get("/:id", carController.getCarById);

module.exports = router;