const express = require("express");
const app = express();
const https = require("https"); //one of the native modules
                                // no need to install
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true})); // neccesery to use body parser

app.get("/", function(req, res){
  res.sendFile( __dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apikey = "7b93eebadc1b2af43c359daeea868674";
  const units = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=" + units;

  https.get(url, function (response){
    //console.log(response.statusCode);

    response.on("data", function(data){
      const weather_data = JSON.parse(data);
      const temp = weather_data.main.temp;
      const description = weather_data.weather[0].description;
      const icon = weather_data.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.set("Content-Type","text/html");
      res.write("<h1>Temperature at " + query + " : "+temp+" Celcius.</h1>");
      res.write("<p>The weather is currently " + description + "</p>");
      res.write( "<img src = "+ imgURL +">");
      res.send();

    });
  });
  //res.send("Server is UP and running.");
  // ONLY ONE res.send can EXIST in a function
});

app.listen(3000, function(){
  console.log("here we are");
});
