const { BookingRepository } = require("../repository")
const axios = require("axios")

const { FLIGHT_SERVICE_PATH } = require("../config/server-config")
const { ServiceError } = require("../utils/errors")
class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository()
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId
            let getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`
            const response = await axios.get(getFlightRequestUrl)
            const flightData = response.data.data
            let priceOfFlight = flightData.price

            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError(
                    "Something went wrong in Booking process",
                    "Insufficient seats "
                );
            }

            console.log(flightData.totalSeats)

            const totalCost = priceOfFlight * data.noOfSeats
            const bookingPayload = { ...data, totalCost } // Destructure and add new propt
            const booking = await this.bookingRepository.create(bookingPayload)
            const updateFlightRequesturl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${booking.flightId}`
            await axios.patch(updateFlightRequesturl, { totalSeats: flightData.totalSeats - booking.noOfSeats })
            const finalBooking = await this.bookingRepository.update(booking.id, { status: "Booked" })
            return finalBooking

        } catch (error) {

            if (error.name == "RepositoryError" || error.name == "ValidationError") {
                throw error
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService