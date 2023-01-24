require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
