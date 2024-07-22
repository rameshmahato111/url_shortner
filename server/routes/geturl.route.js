const express = require("express")
const { getShortURL } = require("../app/controller/shorturl.controller")

const router = express.Router()
router.route("/geturl").get(getShortURL)


module.exports = router