const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter username"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Choose a password"],

    },
    country: {
        type: String,
        required: [true, "Select your country"]
    },
    city: {
        type: String,
        required: [true, "Select your city"]
    },
    phone: {
        type: Number,
        required: [true, "Enter your phone number"]
    },
    role: {
        type: Number,
        default: 0 // 0=user , admin=1
    },
    avatar: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const generateAuthToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: "2d" })
    return token
};

// const validation = (data) => {
//     const schema = Joi.object({
//         username: Joi.string().required(),
//         email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//         country: Joi.required(),
//         city: Joi.required(),
//         phone: Joi.number().required(),
//         password: Joi.string().min(3).max(15).required()
//     });
//     return schema.validate(data)
// }

const User = mongoose.model("User", userSchema);

module.exports = { User, generateAuthToken };