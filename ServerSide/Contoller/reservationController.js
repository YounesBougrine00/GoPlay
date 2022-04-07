const { Reservation } = require('../models/reservationModel')
const { Stadium } = require('../models/stadiumsModel')
const Stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)


const reservationCtrl = {
    createReservation: async(req, res) => {
        try {
            const { resTime, sport, fieldType, _id, token, amount, time, id } = req.body
            if (!resTime || !sport || !fieldType) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }
            await Stripe.charges.create({
                source: token.id,
                amount,
                currency: 'mad',
            });

            await new Reservation({ user: id, stadium: _id, payment_ref: token.id, field: fieldType, sport: sport, resTime: resTime, time: time }).save();
            res.status(200).json({ message: "Your reservation was succefully completed" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    pullReservation: async(req, res) => {
        try {
            const { time, _id } = req.body
            const resDate = new Date(time)

            const maxDate = new Date(resDate.valueOf())
            const minDate = new Date(resDate.valueOf())
            maxDate.setHours(23, 59, 59)
            minDate.setHours(00, 00, 00)

            const reservations = await Reservation.find({ date: { $gt: minDate, $lt: maxDate }, stadium: _id })
                // if (reservations.length == 0) { return res.status(200).json({ message: "No reservations found." }); }

            res.json(reservations)

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getUserReservations: async(req, res) => {
        try {
            const { id } = req.body
            const reservations = await Reservation.find({ user: id }).sort([
                ['date', -1]
            ])

            if (reservations.length == 0) return res.status(400).json({ message: "You have no reservations yet " })
            const stadiums = await Stadium.findById(reservations[0].stadium)
            console.log(stadiums)

            res.status(200).send([reservations[0], stadiums])
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = reservationCtrl;