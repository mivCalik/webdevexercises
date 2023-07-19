const express = require("express");
const app = express();

// "/" is meantfor route
app.get("/", function(req, res){
  res.send("<h1>Hello darkness my old friend..</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me at: merve.n.clk@gmail.com");
});

app.get("/about", function(req,res){
  res.send("Merve Nur Çalık\ çok tatlı bir ponçik");
});

app.listen(3000, function (){
  console.log("server started on port 3000");
});   // listen port 3000
