const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let todos = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.get("/", (req, res) => {

    const options = {
        weekday: 'long',
        month: "long",
        day: "numeric"
    }
    const today = new Date();
    const day = today.toLocaleDateString("en-US", options);
    console.log(day);
    res.render("list", { listTitle: day, todos: todos });
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", todos: workItems });
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

})

app.post("/work", (req, res) => {
    res.redirect("/work");
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
})