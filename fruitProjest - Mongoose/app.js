



const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB'); // creates if not exist then connects

const fruitSchema = new mongoose.Schema({   // a schema for database collection(table)
  name: {
    type:String,
    required:true // for optional msg [true, "name is a MUST"]
  },
  rating: {
      type: Number,
      min:1,
      max:10
  },
  review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const mandarin = new Fruit({
  name:"mandarin",
  rating: 10,
  review:"kötü gün dostu"
})
//fruit.save()
// .then(() => console.log('meow'));

async function delete_f(){
  try{
    const deleted = await Fruit.deleteOne({name:"Apple"});
    if(deleted){
      console.log("delete is successful");
      find_func();
    }
  }
  catch(err){console.log(err);}
}

//delete_f();



async function update(){
  try{
    const updated = await Fruit.updateOne({name:"Peach"}, {name:"Apple"});
    if(updated){
      console.log("Update is successful!!");
      find_func();
    }
  }
  catch(err){
    console.log(err);
  }
}

//update();

// assume there are more fruits to be added

// Fruit.insertMany([banana, kiwi, orange], (err)=>{
//   if(err){console.log(err);}else{console.log("All fruits successfuly added to fruitsDB");}
// });
//

async function find_func(){
  try{
    const fruits = await Fruit.find();
    if(fruits){
      fruits.forEach((fruit)=>{
        console.log(fruit.name);
      });
    }
  }catch(err){
    console.log(err);
  }
  // with closing no need to CTRL+c anymore
  //mongoose.connection.close(); // adding people comment out edilmezse connection canceled hatası veriyor
}
//find_func();




const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name:"Pineapple",
  rating:6,
  review:"Great taste but doesn't agree with my stomach"
})
// pineapple.save()
// const newPerson = new Person({name:"Amy", age:21, favoriteFruit:pineapple});
// newPerson.save() // to save into database

async function add_fruit_2_person(personName, fruit_){
  try{
    const updated = await Person.updateOne({name:personName}, {favoriteFruit:fruit_})
    if(updated){console.log(`${personName} is Updated to ${fruit_.name}`);}
  }catch(err){console.log(err);}
  mongoose.connection.close();
}
add_fruit_2_person("John", mandarin); // defined above as cherry

async function deletePerson(){
  try{
    const deleted = await Person.deleteMany({name:"John"});
    if(deleted){console.log("all Johns are deleted !!!");}
  }catch(err){console.log(err);}
  mongoose.connection.close();
}
//deletePerson();

//      Native mongodb driver kullanarak yaptık aşağıyı
//////////////////////////////////////////////////////////////////

// const { MongoClient } = require("mongodb");//require pakage
// const uri = "mongodb://0.0.0.0:27017/"; //url
// const client = new MongoClient(uri);
//
// async function run() {
//   try {
//       //write your code here:
//
//
//
//     console.log("Sever Connected");
//     const database = client.db('fruitsDB');//creates database if not exists
//
//     const collection = database.collection('fruits');//creates collection if not exists
//
//     //creates the data
//     await collection.insertMany([
//         {
//             id:1,
//             name:"mango",
//             price:32
//         },{
//             id:2,
//             name:"apple",
//             price:12,
//         },{
//             id:3,
//             name:"coconut",
//             price:5
//         }
//     ]);
//
//     //for loop to print the data
//     for (let i = 1; i <= 3; i++) {
//         field = await collection.findOne({id:i});
//         console.log(field);
//     }
//
//   } finally {
//     // Ensures that the client will close when you finish/error
//       client.close();
//   }
// }
//
//
// run().catch(console.dir);
