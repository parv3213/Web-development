const express = require("express");

const app = express();

app.get("/", function(req,res){
    res.send("<h1>Hello World</h1>");
});

app.get("/contact", function(req,res) {
    res.send("contact me at parv3213@gmail.com");
})

app.get("/about", function(req,res) {
    res.send("My name is Parv, I love coding");
})

app.listen(3000, function() {
    console.log("Server started at port: 3000");
});