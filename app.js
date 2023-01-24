require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO);

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = new mongoose.model("Article", articleSchema);

const arancia = new Article({
  title: "Questa arancia è incredibile",
  content:
    "Oggi è stata scoperta un arancia di dimensioni pazzesche, non riuscirete a credere ai vostri occhi quando a vedrete",
});

arancia.save();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
