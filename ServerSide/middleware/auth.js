const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid Authentification." })

        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentification 2." })
            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth;