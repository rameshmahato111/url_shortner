const express = require('express');
const {generateShortURL, getShortURL} = require('../app/controller/shorturl.controller');


const router = express.Router()

router.post("/shorturl", generateShortURL)

router.get("/shorturl", getShortURL)

module.exports = router;