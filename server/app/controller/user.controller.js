
const User = require("../modal/user.modal");
const bcrypt = require("bcrypt");
const user_register = async (req, res) => {
  try {
    const { fullname, email, password} = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message:
          "user with this email already exists. Please use another valid email",
      });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong please try again." });
  }
};

module.exports = user_register;
