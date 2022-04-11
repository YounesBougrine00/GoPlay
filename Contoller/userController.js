const { User, generateAuthToken } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userCtrl = {
    register: async(req, res) => {
        try {
            // const { err } = validation(req.body);
            // if (err) return res.status(400).json({ message: "Invalid" });
            const { username, email, password, country, city, phone } = req.body;
            if (!username || !email || !password || !country || !city || !phone) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Invalid emails." });
            }
            //See if user exists
            const user = await User.findOne({ email: email });

            if (user) return res.status(400).json({ message: "Email already exits" });

            if (password.length < 4) return res.status(400).json({ message: "Password must be at least 4 characters." })
                //crypt password
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);

            //save user to MongoDB
            await new User({...req.body, country: country.label, city: city.label, password: hashPassword }).save();
            res.status(201).json({ message: "User created succefully" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    login: async(req, res) => {
        try {
            const { err } = validateLogin(req.body);
            if (err) return res.status(400).send({ message: err.details[0].message });

            const user = await User.findOne({ email: req.body.email });
            if (!user)
                return res.status(400).send({ message: "Invalid Email or Password" });

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword)
                return res.status(400).send({ message: "Invalid Email or password" });

            const token = generateAuthToken({ id: user._id });
            res.cookie("authtoken", token, {
                httpOnly: true,
                path: "/api/user/authtoken",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).send({ data: token, message: "Logged in succefully" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
    getAccessToken: async(req, res) => {
        try {
            const access_token = req.cookies.authtoken;
            if (!access_token)
                return res.status(400).json({ message: "Please login now!" });

            jwt.verify(access_token, process.env.JWT_PRIVATE_KEY, (err, user) => {
                if (err) return res.status(400).json({ msg: "login now please!" });

                // const accesstoken = generateAuthToken({ id: user._id });
                res.json({ access_token });
            });
        } catch (err) {
            res.status(500).send({ message: "Internal Server error" });
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie("authtoken", { path: "/api/user/authtoken" });
            return res.json({ msg: "Logged out." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfos: async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            console.log("OK");
            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateUser: async(req, res) => {
        try {
            const { name, phone, avatar } = req.body;
            await User.findOneAndUpdate({ _id: req.user.id }, { name, phone, avatar });

            res.json({ message: "Informations updated succefully ! " });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email or username"),
        password: Joi.string().required().label("password"),
    });
    return schema.validate(data);
};

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = userCtrl;