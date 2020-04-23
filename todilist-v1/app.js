const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");


app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

let todos = ["but food","cook food","eat food"];
app.get("/", (req, res) => {

    const options = {
        weekday: 'long',
        month: "long",
        day: "numeric"
    }
    const today = new Date();
    const day = today.toLocaleDateString("en-US",options);
    console.log(day);
    res.render("list", { day: day, todos: todos });
});

app.post("/", (req,res) => {
    const newTodo = req.body.newTodo;
    todos.push(newTodo);
    res.redirect("/");
})



app.listen(3000, () => {
    console.log("Server running on port 3000");
})