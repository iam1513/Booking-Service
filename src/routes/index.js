const express = require("express")

const router = express.Router();

router.use('/v1', v1routes)

module.exports = router