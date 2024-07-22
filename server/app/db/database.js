const mongoose = require("mongoose");

const database = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    if (db) {
      console.log(`database is connected successfull to ${db.connection.host}`);
    } else {
      console.log("something went wrong to the database connection");
      process.exit(1);
    }
  } catch (error) {
    res.status(500).json({ message: "server error" ?? error.message });
  }
};

module.exports = database;
