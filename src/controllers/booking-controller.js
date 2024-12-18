const { BookingService } = require("../services")
const { StatusCodes } = require("http-status-codes")
const { createChannel, publishMessage } = require('../utils/message-queue')
const { REMINDER_BINDING_KEY } = require("../config/server-config")

const bookingService = new BookingService()

class BookingController {

    constructor() {
    }

    async sendMesaageToQueue(req, res) {

        const channel = await createChannel();
        const payload = {
            data: {
                subject: "Notification from queue",
                content: "Some queue will subscribe this",
                recepientEmail: "reminderservice1513@gmail.com",
                notificationTime: "2024-11-29T14:00:00"
            },
            service: "CREATE_TICKET"
        }
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload))
        return res.status(200).json({
            message: "Successfully published an Event"
        })
    }

    async create(req, res) {
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
}


module.exports = BookingController