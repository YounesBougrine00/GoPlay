const router = require("express").Router();
const reservationCtrl = require('../Contoller/reservationController')
const auth = require('../middleware/auth')

router.post('/create-reservation', auth, reservationCtrl.createReservation)
router.post('/pull-reservations', reservationCtrl.pullReservation)

module.exports = router