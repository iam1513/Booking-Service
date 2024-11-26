const { BookingService } = require("../services")
const { StatusCodes } = require("http-status-codes")
const bookingService = new BookingService()

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body)
        return res.status(StatusCodes.OK).json({
            message: "Successfully created booking",
            success: true,
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            data: {},
            err: error.explanation
        })
    }
}

module.exports = {
    create
}