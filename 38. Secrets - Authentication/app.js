//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");
const encryt = require("mongoose-encryption");
mongoose.connect('mongodb://127.0.0.1:27017/secretsDB');
const userSchema = new mongoose.Schema({
  email:String,
  password: String
});

const secret = process.env.SECRET;
userSchema.plugin(encryt, {secret:secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

//önce mongoose Schema tanımlayıp
//secret ile plugin yapmalıyız
//daha sonra model oluşturmalıyız

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extented:true}));


app.get("/", (req,res)=>{
  res.render("home");
});

app.get("/login", (req,res)=>{
  res.render("login");
});
app.post("/login", (req,res)=>{
  const username = req.body.username;
  const pw = req.body.password;

  User.findOne({email:username})
  .then((user)=>{
    console.log(user.password);
    if(user.password  === pw){
      res.render("secrets");
    }else{
      console.log("wrong password");
    }
    })
  .catch((err)=>{console.log( "NOT FOUND\n\n", err);})
})

app.get("/register", (req,res)=>{
  res.render("register");
});

app.post("/register", (req,res)=>{
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save()
  .then((nu)=>{ console.log(nu);res.render("secrets");})
  .catch((err)=>{console.log(err);})

});

app.listen(3000, ()=>{
  console.log("Server started on port 3000.");
});
