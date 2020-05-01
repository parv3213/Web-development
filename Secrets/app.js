//-------------------- Lib requires --------------------
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//-------------------- basics --------------------
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------- Mongoose --------------------
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
const userScheme = new mongoose.Schema({
    email: String,
    password: String,
});

const User = new mongoose.model("User", userScheme);

//-------------------- Routes --------------------
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (e, hash) => {
        const newUser = new User({
            email: req.body.username,
            password: hash,
        });
        newUser.save((e) => {
            if (e) {
                res.render(e);
            } else {
                res.render("secrets");
            }
        });
    });
});

app.post("/login", (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    User.findOne({ email: userName }, (e, foundUser) => {
        if (e) {
            res.send(e);
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (e, result) {
                    if (result === true) {
                        res.render("secrets");
                    } else {
                        res.send("Inccorect Password");
                    }
                });
            } else {
                res.send("Username does not exists");
            }
        }
    });
});

//-------------------- Listen Route --------------------
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
