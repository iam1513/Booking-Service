const express = require("express")
// const { createChannel } = require('../../utils/message-queue')
const router = express.Router();

const { BookingController } = require("../../controllers")
// const channel = await createChannel();
const bookingController = new BookingController()
router.post('/bookings', bookingController.create)
router.post('/publish', bookingController.sendMesaageToQueue)

module.exports = router