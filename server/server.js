require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const app = express();
const port = 4000;
const cors = require("cors");
const db = require("./app/db/database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});
db();
app.listen(port, (err) => {
  if (!err) {
    console.log(`server is running on port, ${port}`);
  } else {
    console.log("something went wrong in the server");
  }
});
