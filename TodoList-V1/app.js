const express = require("./node_modules/express");
const bodyParser = require("./node_modules/body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const todos = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.get("/", (req, res) => {
  res.render("list", { listTitle: date.getDate(), todos: todos });
});

app.post("/", (req, res) => {
  const newTodo = req.body.newTodo;

  if (req.body.list === "Work List") {
    workItems.push(newTodo);
    res.redirect("/work");
  } else {
    todos.push(newTodo);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", todos: workItems });
});

app.post("/work", (req, res) => {
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
