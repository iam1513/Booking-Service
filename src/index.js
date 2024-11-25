const express = require("express")

const app = express()

const { PORT } = require("./config/server-config")
const bodyParser = require("body-parser")

const apiRoutes = require("./routes/index")

const db = require("./models/index")

const setUpAndStartServer = () => {


    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/api', apiRoutes)

    app.listen(PORT, () => {


        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true })
        }

        console.log(`Live on port ${PORT}`)
    })
}

setUpAndStartServer()