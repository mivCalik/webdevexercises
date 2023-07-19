// "npm init" in folder the initiate npm
// "npm i silyname"  to install npm sillyname module
var generateName = require("sillyname");
var sillyname = generateName()

console.log(`My name is ${sillyname}.`);


var sups = require("superheroes");
// this is how we require file system
console.log(`I am ${sups.random()}`);

//console.log(sups.random());
//spellbinder is my fav

var bad_guys = require("supervillains");
console.log(`My nemesis is ${bad_guys.random()}`);
