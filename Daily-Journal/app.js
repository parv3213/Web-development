const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ---------------------- Mongoose DB connect ----------------------
mongoose.connect("mongodb://localhost/dailyJournalDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ---------------------- Mongoose DB schema ----------------------
const postScheme = new mongoose.Schema({ title: String, content: String });
const Post = mongoose.model("Post", postScheme);

const homeStartingContent = "Add '/compose' at the end of ☝🏻url to add a new post";
const aboutContent = "Hi! This Daily Journal was made by Parv Garg 🤓 ";
const contactContent = "Heya! Reach me at Parv3213@gmail.com";

// ---------------------- Home Route ----------------------
app.get("/", (req, res) => {
  Post.find({}, (e, foundPosts) => {
    res.render("home", { content: homeStartingContent, posts: foundPosts });
  });
});

// ---------------------- About Route ----------------------
app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});

// ---------------------- Contact Route ----------------------
app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});

// ---------------------- Compose Route ----------------------
app.get("/compose", (req, res) => {
  res.render("compose");
});

// ---------------------- Compose Post Route ----------------------
app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  post.save((e) => {
    if (!e) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postName", (req, res) => {
  const postName = _.lowerCase(req.params.postName);
  Post.find({}, (e, foundPosts) => {
    if (!e) {
      for (let i = 0; i < foundPosts.length; i++) {
        let storedTitle = _.lowerCase(foundPosts[i].title);
        if (storedTitle === postName) {
          res.render("post", { title: foundPosts[i].title, content: foundPosts[i].content });
          break;
        }
        console.log("Post not found. Redirecting to Home Page");
        res.redirect("/");
      }
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
