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
    if(err) return console.log(err);
    done(null, foodItem);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, people) {
    if(err) return console.log(err);
    done(null, people);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, found) {
    if(err) return console.log(err);
    found.favoriteFoods.push(foodToAdd);

    found.save(function(err, updatedPerson) {
      if(err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, function(err, updatedPerson){
    if(err) return console.log(err);
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, found) {
    if(err) return console.log(err);
    done(null, found);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, found) {
    if(err) console.log(err);
    done(null, found);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch})
    .sort({name : 1})
    .limit(2)
    .select({ age: 0 })
    .exec(function(err, person) {
      if(err) return console.log(err);
      done(null, person);
    });
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
