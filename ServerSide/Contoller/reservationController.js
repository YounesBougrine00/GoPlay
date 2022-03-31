const { Reservation } = require('../models/reservationModel')


const reservationCtrl = {
    createReservation: async(req, res) => {
        try {
            const { resTime, sport, fieldType, _id } = req.body
            if (!resTime || !sport || !fieldType) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }
            await new Reservation({ user: req.user.id, stadium: _id, field: fieldType, sport: sport, resTime: resTime }).save();
            res.status(201).json({ message: "Reservation completed succefully" });
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
    }
}

module.exports = reservationCtrl;