const mongoose = require('mongoose')

const connectDB = async ()=>{
    await mongoose.connect(process.env.CAR_RENTAL_MONGODB_URI)
    console.log("Car-Rental DB Connected")
}

module.exports = connectDB