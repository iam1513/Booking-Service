const express = require("express")

const router = express.Router();

router.use('/booking', bookingRoutes)

module.exports = router