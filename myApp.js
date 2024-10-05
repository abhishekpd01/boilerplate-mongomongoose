require('dotenv').config();
const { type } = require('express/lib/response');
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://abhishekMDB:abhishekMDB@cluster0.8acdt.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {type : String, required : true},
  age : Number,
  favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var newPerson = new Person({name: "Yashi", age: 22, favoriteFoods: ["cake", "pastries"]});

  newPerson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

var arrayOfPeople = [
  {name : "Abhishek", age: 23, favoriteFoods : ["idli", "cake", "pastries"]},
  {name : "person2", age: 46, favoriteFoods : []},
  {name : "person3", age: 64, favoriteFoods : ["idli"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if(err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, function(err, people) {
    if(err) return console.log(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, function(err, foodItem) {
    if(err) console.log(err);
    done(null, foodItem);
  });
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
