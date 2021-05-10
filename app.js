const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
// const { query } = require("express");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));





app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   


});





 app.post("/", (req, res) => {
 
    const query = req.body.cityName;
    const apiId = "2f97477e1c7d64efda47ec3c56bfd605"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId + "&units=" + unit;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png"
            const temperature = weatherData.main.temp;
            const windSpeed = weatherData.wind.speed;
            const country = weatherData.sys.country;
            // console.log(windSpeed + " windSpeed");
            console.log(response.statusCode);
            // console.log(weatherDescription);
            // console.log(imageUrl);
            res.write("<h1>The temperature at " + query +  "  located in country " + country + "</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.write("<em>The weather description is " + weatherDescription + ". </em>");
            res.write("<em>The temperature is " + temperature + " degree celcius.</em>");

            res.write("<em> The current wind speed is " + windSpeed + ".</em>");


            res.send()

        })
    })


});






const port = 3000;
app.listen(port, () => {
    console.log(`port ${port} is listening to the weather changes...`)
})