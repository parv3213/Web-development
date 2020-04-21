const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/bmiCalculator", function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/", function (req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    res.send("The Answer is: " + result); 
});

app.post("/bmiCalculator", (req,res) => {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = weight / (height*height);
    console.log(weight);
    console.log(height);
    console.log(bmi);
    res.send("Your BMI is:  "+bmi);
});

app.listen(3000, function () {
    console.log("Local server running at port 3000");
});