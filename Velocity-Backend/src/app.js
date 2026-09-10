const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/auth.route')
const carRoute = require('./routes/car.route')
const wishListRoute = require('./routes/wishlist.route')
const bookingRoute = require('./routes/booking.route')
const contactRoute = require('./routes/contact.route')

const app = express()


//Middlewares
app.use(express.json())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        message: "Velocity API running"
    });
});

//Routes
app.use('/api/auth' , authRoute)
app.use('/api/cars' , carRoute)
app.use('/api/wishlist' , wishListRoute)
app.use('/api/bookings' , bookingRoute)
app.use('/api/contact' , contactRoute)

module.exports = app