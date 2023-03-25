const express = require("express");
const https= require("https");
const bodyParser = require("body-parser"); //body-parser to access data entered at the client-side and POSTed to our server

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/", (req,res)=>{
    var userCity= req.body.cityName;

    const appKey = "c8b7cea26c23bc0b27b85509e38b0c70";
    const unit= "metric";
    

    const url= "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&units="+unit+"&appid="+appKey;
    https.get(url,(response)=>{
        // console.log(res);
        response.on("data", (data)=>{
            const weatherData= JSON.parse(data); //JSON.parse(data) to parse a JSON file and convert it into JS Object
            // console.log(weatherData);
            //JSON.stringify("object-name") to condense JS Obj into JSON file 
            var weatherTemp= weatherData.main.temp;
            console.log(weatherTemp);
            var weatherDescription= weatherData.weather[0].description;
            console.log(weatherDescription);
            var weatherIcon= weatherData.weather[0].icon;
            var weatherIconUrl= "https://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
            //There can be unlimited res.write()
            res.write("<h1>Temperature in " + userCity+" is "+ weatherTemp+ " degrees Celcius</h1>");
            res.write("<p>Weather Description: "+weatherDescription+"</p>");
            res.write("<img src=" + weatherIconUrl + ">");
            res.send();
        });
    });
    // res.send("Up and running");--> There can be only one send method in the .get method
});

app.listen(3000, ()=>{
    console.log("port 3000 is listening");
});