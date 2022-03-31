const { required, date } = require('joi')
const mongoose = require('mongoose')


const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stadium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stadiums'
    },
    resTime: {
        type: Number,
        required: [true]
    },
    sport: {
        type: String,
        required: [true]
    },
    field: {
        type: String,
        required: [true]
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = { Reservation }