const express = require("express");

const app = express.Router();

const register_route = require("./register.route");
const login_route = require("./login.route")
const shorturl_route = require("./shorturl.route")
app.use(register_route);
app.use(login_route)
app.use(shorturl_route)

module.exports = app;
