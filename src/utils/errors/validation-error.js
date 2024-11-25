const { StatusCodes } = require("http-status-codes")

class ValidationError extends Error {
    constructor(error) {
        super()
        let explanation = []
        error.erros.forEach(error => {
            explanation.push(error.message)
        });
        this.name = "ValidationError",
            this.message = "Not able to validate the data sent in the request",
            this.explanation = explanation,
            this.statusCodes = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError