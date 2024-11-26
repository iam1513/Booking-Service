const { Booking } = require("../models/index")
const { ValidationError, AppError } = require("../utils/errors")
const { StatusCodes } = require("http-status-codes")
class BookingRepository {


    async create(data) {
        try {
            const booking = await Booking.create(data)
            return booking
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error)
            }
            console.log("Something went wrong in Repository")
            throw new AppError(
                "RepositoryError",
                "Can not create a booking",
                "There was an issue in creating a booking, please try later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId)
            if (data.status) {
                booking.status = data.status
            }
            await booking.save()

            return booking
        } catch (error) {
            throw new AppError(
                "RepositoryError",
                "Can not update booking",
                "There was an issue in updating a booking, please try later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

}

module.exports = BookingRepository