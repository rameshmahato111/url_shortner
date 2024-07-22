const express = require("express");
const user_register = require("../app/controller/user.controller");

const router = express.Router()

router
.route('/register')
.post(user_register)
module.exports = router;