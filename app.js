require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.set("strictQuery", false);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO + "wikiDB");

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

// arancia.save();

// requests targetting all articles
app.get("/articles", function (req, res) {
  Article.find({}, function (err, foundArticles) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundArticles);
    }
  });
});

app.post("/articles", function (req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  newArticle.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Successfully add new article");
    }
  });
});

app.delete("/articles", function (req, res) {
  Article.deleteMany({}, function (err, objectsDeleted) {
    if (err) {
      console.log(err);
    } else {
      res.send(`There are ${objectsDeleted.deletedCount} document deleted`);
    }
  });
});

// requests targetting a specific article
app.get("/articles/:articleTitle", function (req, res) {
  Article.findOne(
    { title: req.params.articleTitle },
    function (err, foundArticle) {
      if (err) {
        console.log(err);
      } else {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.sendStatus(404).send("Any article found");
        }
      }
    }
  );
});

app.put("/articles/:articleTitle", function (req, res) {
  Article.replaceOne(
    { title: req.params.articleTitle },
    { title: req.body.title, content: req.body.content },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send("Successfully update article");
      }
    }
  );
});

app.patch("/articles/:articleTitle", function (req, res) {
  const updatequery = {};
  req.body.title
    ? (updatequery.title = req.body.title)
    : (updatequery.content = req.body.content);

  Article.findOneAndUpdate(
    { title: req.params.articleTitle },
    updatequery,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send(
          `Successfully update ${updatequery.title ? "title" : "content"}`
        );
      }
    }
  );
});

app.delete("/articles/:articleTitle", function (req, res) {
  Article.findOneAndDelete({ title: req.params.articleTitle }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Deleted article");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
