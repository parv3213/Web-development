const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res) => {
    console.log(req.body);
    const cityName = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=cd67d84da7ad7a32c9596d86fc970618";
    https.get(url, (response) => {
        response.on("data", (data) => {
            const parsedData = JSON.parse(data);
            const temp = parsedData.main.temp;
            const weatherDes = parsedData.weather[0].description;
            const icon = parsedData.weather[0].icon;
            res.write("<h1>Weather in "+cityName+" is "+temp+" degree celsius</h1>")
            res.write("<p>Description: "+weatherDes+"</p>");
            res.write("<img src = 'http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
            res.send();
        });
    });

});


// const url = "https://api.openweathermap.org/data/2.5/weather?q=hyderabad&units=metric&appid=cd67d84da7ad7a32c9596d86fc970618";
    
// https.get(url, (response) => {
//     response.on("data", (data) => {
//         const parsedData = JSON.parse(data);
//         const temp = parsedData.main.temp;
//         const weatherDescription = parsedData.weather[0].description;

//         res.write("<h1>The Weather in Hyderabad is "+temp+" degree celcius.</h1><br>"+"<p>It is "+weatherDescription+" there.</p>")
//         res.write("<img src = 'http://openweathermap.org/img/wn/"+parsedData.weather[0].icon+"@2x.png'>");
//         res.send();

//     });
// });



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})