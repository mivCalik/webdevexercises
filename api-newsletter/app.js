const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("img"));
app.use(bodyParser.urlencoded({extended:true})); // neccesery to use body parser


app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
  const first_n = req.body.fname;
  const last_n = req.body.lname;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first_n,
          LNAME: last_n
        }
      }
    ]
  };
  const json_data = JSON.stringify(data); // this is what we send to mailchimp

  const url = "https://us21.api.mailchimp.com/3.0/lists/ed2e4c0ca3";

  const options = {
    method :"POST",
    auth: "merve123:8f75bd0591f7fd7475104d25d4d5cfb7-us2"     //https://nodejs.org/api/http.html#httprequestoptions-callback
  }

  /// HTTPS request module /////
  const request = https.request(url, options, function(response){

    // response.on'dan önce olunca çalışıyor yoksa çalışmıyor
    if (response.statusCode === 200){
      res.sendFile(__dirname +"/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(json_data);
  request.end();

});


app.post("/failure", function(req,res){
  res.redirect("/");
})

// localhost:3000 portu yerine dynamic bir port yazdık ve or ile
// 3000 ekledik ki kendi bilgisayarımızda da çalışsın
app.listen(process.env.PORT || 3000, ()=>{console.log("Server is ruuning @ port 3000.");});

// api key
//8f75bd0591f7fd7475104d25d4d5cfb7-us21

// audience id
// ed2e4c0ca3


//https://mailchimp.com/developer/marketing/docs/fundamentals/#the-basics
