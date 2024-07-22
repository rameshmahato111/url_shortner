const User = require("../modal/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login_controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const validateEmail = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if (!validateEmail.test(email)) {
      return res.status(400).json({ message: "invalid Email format." });
    }

    const checkExistingUser = await User.findOne({ email });
    if (!checkExistingUser) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, checkExistingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password." });
    }
    // generate jwt
    const token = jwt.sign(
      { userId: checkExistingUser._id,
        name: checkExistingUser.fullname,
        email: checkExistingUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );
    res.status(200).json({ token }); // Added return statement to send the response
  } catch (error) {
    res.status(500).json({ message: error.message || "server error" });
  }
};

module.exports = login_controller;
