// ------- require modules -------
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

// ------- Creating express app -------
const app = express();

// ------- app.set -------
app.set("view engine", "ejs");

// ------- app.use -------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ------- mongoose db connection -------
mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// ------- collection schema and model -------
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Article = mongoose.model("Article", articleSchema);

// ------- app.route for "/articles" -------
app.route("/articles")
    // ------- app.get to fetch all the articles (also from db) -------
    .get((req, res) => {
        Article.find({}, (e, foundArticles) => {
            if (!e) {
                res.send(foundArticles);
            } else {
                res.send(e);
            }
        });
    })
    // ------- app.post to post req from user and save in DB -------
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });
        newArticle.save((e) => {
            if (!e) {
                res.send("Successfully added new Article");
            } else {
                res.send(e);
            }
        });
    })
    // ------- app.delete to delete all articles (also from db) -------
    .delete((req, res) => {
        Article.deleteMany((e) => {
            if (!e) {
                res.send("Successfully deleted all the articles");
            } else {
                res.send(e);
            }
        });
    });

app.route("/articles/:articleTitle")
    .get((req, res) => {
        // console.log(req.params.articleTitle);
        Article.findOne({ title: req.params.articleTitle }, (e, foundArticle) => {
            if (!e) {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No article matching the title");
                }
            } else {
                res.send(e);
            }
        });
    })
    .put((req, res) => {
        Article.replaceOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            (e) => {
                if (!e) {
                    res.send("Successfully updated the article");
                } else {
                    res.send(e);
                }
            }
        );
    })
    .patch((req, res) => {
        Article.updateOne({ title: req.params.articleTitle }, { $set: req.body }, (e) => {
            if (!e) {
                res.send("Successfully updated the article");
            } else {
                res.send(e);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (e) => {
            if (!e) {
                res.send("Successfully delete the article");
            } else {
                res.send(e);
            }
        });
    });

// ------- app.listen -------
app.listen(3000, () => {
    console.log("Server running at port 3000");
});
