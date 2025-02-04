require("dotenv").config();
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}

const MONGO_URI = process.env["MONGO_URI"];
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John",
    age: 30,
    favoriteFoods: ["Pizza", "Pasta"],
  });
  person.save(function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, foodFound) {
    if (err) return console.log(err);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    },
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return console.log(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
    {
      name: nameToRemove,
    },
    function (err, removedPerson) {
      if (err) return console.log(err);
      done(null, removedPerson);
    },
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, success) => {
      if (err) return console.error(err);
      done(null, success);
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
