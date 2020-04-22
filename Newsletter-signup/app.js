const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const dataShortcut = req.body;
    const fName = dataShortcut.fName;
    const sName = dataShortcut.sName;
    const email = dataShortcut.email;

    const userData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_feilds: {
                    FNAME: fName,
                    LNAME: sName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(userData);

    const url = "https://us4.api.mailchimp.com/3.0/lists/9660118054";

    const options = {
        method: "POST",
        auth: "parv3213:f007cceda3aae0c781f67fa2f14f6713-us4"
    }

    const request = https.request(url, options, (response) => {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req,res) => {
    res.redirect("/");
});


app.listen(process.env.PORT ||  3000, () => {
    console.log("Server is running");
});

// f007cceda3aae0c781f67fa2f14f6713-us4
// 9660118054