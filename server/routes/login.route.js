const express = require("express");
const login_controller = require("../app/controller/login.controller");

const router = express.Router();

router.route("/login").post(login_controller);
module.exports = router;
