const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Add '/compose' at the end of ☝🏻url to add a new post";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { content: homeStartingContent, posts: posts });
  // console.log(posts);
});

app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const postName = _.lowerCase(req.params.postName);

  for (let i = 0; i < posts.length; i++) {
    let storedTitle = _.lowerCase(posts[i].title);
    if (storedTitle === postName) {
      res.render("post", { title: posts[i].title, body: posts[i].body });
      break;
    } else {
      console.log("Post not found. Redirecting to Home Page");
      res.redirect("/");
    }
  }
  console.log("Post not found. Redirecting to Home Page");
  res.redirect("/");
});


app.listen(process.env.PORT ||3000, function () {
  console.log("Server started on port 3000");
});
