//v2 version w/o cyclic deployment steps

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();


//



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
//
// app.get("/", function(req, res) {
//
// const day = date.getDate();
//
//   res.render("list", {listTitle: day, newListItems: items});
//
// });
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-merve:test123@cluster0.qm7fxdy.mongodb.net/todolistDB");
const itemSchema = {title: String};
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({title: "Buy Food"});
const item2 = new Item({title: "Cook Food"});
const item3 = new Item({title: "Eat Food"});
const default_i = [item1, item2, item3];


const listSchema = {
  name: String,
  items: [itemSchema]
};
const List = mongoose.model("List", listSchema);
const day = date.getDate();

app.get("/", (req, res)=>{
  Item.find()
  .then((data)=> {
    if(data.length===0){
      Item.insertMany(default_i)
      .then(()=>{console.log("Success?");})
      .catch((err)=>{throw err;})
      res.redirect("/");
    }else{
      console.log(data , "Works!");
      res.render("list", {listTitle:day, newListItems:data })  ;
    }

  })
  .catch((err)=>{console.log(err);})
})

//app.get("/favicon.ico", (req,res)=>{res.status(204).end()})

app.get("/:new_route", (req,res)=>{   /////  ROUTE PARAMS
  const newListName = _.capitalize(req.params.new_route);
  List.findOne({name:newListName})
  .then((data)=>{
    if(data){
      //exist
      //console.log("exist");
      res.render("list", {listTitle: data.name, newListItems:data.items});
    }else{
      //not exist
      const list = new List({
        name:newListName,
        items: default_i
      });
      list.save();
      console.log("not exist");
      res.redirect("/"+ newListName);
    }

  })
  .catch((err)=>{console.log(err);});
})




app.post("/", function(req, res){

  const itemTitle = req.body.newItem;
  const listName = req.body.list;
  const newItem = new Item({title:itemTitle});

  if(listName === day){ // nerde değişiklik yapıldıysa orda
      newItem.save()
      res.redirect("/");
  }else{
    List.findOne({name:listName}) //data is returned list item
    .then((data)=>{
      data.items.push(newItem);
      data.save();
      res.redirect("/"+ listName);
    })
    .catch((err)=>{console.error(err);})
  }

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});
app.post("/delete", (req, res)=>{
    const checked = req.body.checkbox; // whole item is returned
    const whichList = req.body.listName;

    if(whichList === day){
      Item.deleteOne({_id:checked})
      .then((data)=>{
        //console.log("Task deleted.");
        res.redirect("/");
      })
      .catch((err)=>{console.error(err, checked);});
    }else{                             // we PULL from İTEMS whose _ID : checked
      List.findOneAndUpdate({name:whichList}, {$pull:{ items:{_id:checked}}})
      .then((data)=>{
        res.redirect("/"+whichList);
      })
    }

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
