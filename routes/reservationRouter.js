const router = require("express").Router();
const reservationCtrl = require('../Contoller/reservationController')
const auth = require('../middleware/auth')

router.post('/create-reservation', reservationCtrl.createReservation)
router.post('/pull-reservations', reservationCtrl.pullReservation)
router.post('/get-user-reservations', reservationCtrl.getUserReservations)

module.exports = router