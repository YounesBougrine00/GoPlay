const mongoose = require('mongoose')
const Joi = require("joi")

const stadiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter username"],
        trim: true
    },
    adress: {
        type: String,
    },
    contact: {
        type: String,
        default: "+212 041351351"
    },
    sports: {
        type: [String]
    },
    fields: {
        type: [String]
    },
    description: {
        type: String,
        default: "Sport Club with 5 diffenrent fields of football and 2 fields of baketball having all comforts options so you have the much fun you can with your friends"
    },
    price: {
        type: Number,
        required: [true, "Enter your price"]
    },
    city: {
        type: String,
        required: [true, "Select your city"]
    },
    country: {
        type: String,
        required: [true, "Select your country"]
    },
    endTime: {
        type: String,
        default: "23:59"
    },
    picture: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Stadium = mongoose.model("stadiums", stadiumSchema);

module.exports = { Stadium };