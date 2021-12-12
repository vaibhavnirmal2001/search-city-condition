const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {

  res.sendFile( __dirname +"/index.html");

});

app.post("/",function (req, res) {
  // console.log(req.body.cityName);




  const query = req.body.cityName;
  const apiKey = "cd80d09f221c384a2ad44de0ccfa284f";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

  https.get(url, function(response){
    console.log(response, response.statusCode);

    response.on("data", function(data){

      const weattherData=JSON.parse(data);
      res.set("Content-Type", "text/html");
      const temp = weattherData.main.temp
      const weatherDescription = weattherData.weather[0].description
      const icon = weattherData.weather[0].icon

      const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(weatherDescription);
      console.log(temp);
      // const outputs = "<h2>The temperature in Pune is : "+ temp + " Degree celcious <br/> currenr weather condition is : "+ weatherDescription+"</h2>";

      res.write("<h2>The temperature in "+ query +" is : "+ temp + " Degree celcious <br/> currenr weather condition is : "+ weatherDescription+"</h2>");
      // res.send();

      res.write("<img src="+ imgurl + ">");

      res.send();

    });
  });

  // res.send("server is running");


});







app.listen(3000,function () {
  console.log("server running on port 3000");
});
