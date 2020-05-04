const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "",
  rating: 7,
  review: "Pretty solid",
});

//------Multiple Addition--------
// const kiwi = new Fruit({
//   name: "kiwi",
//   rating: 10,
//   review: "Best Fruit",
// });

const banana = new Fruit({
  name: "Banana",
  rating: 8,
  review: "Umm IDK",
});

// ------Saving Multiple Files--------
// Fruit.insertMany([kiwi,banana], (e) => {
//     if (e){
//         console.log(e);
//     } else{
//         console.log("Success");
//     }
// });

// ------Saving to DB--------
// fruit.save();

//------UPDATE--------
// Fruit.updateOne(
//   {
//     _id: "5ea36c6ff0468476cf400738",
//   },
//   {
//     rating: 1,
//     review: "I don;t like it ",
//   },
//   (e) => {
//     if (e) {
//       console.log(e);
//     } else {
//       console.log("Successfully changes");
//     }
//   }
// );

// ------Deleting in DB--------
// Fruit.deleteOne({ name: "Apple" }, (e) => {
//   if (e) {
//     console.log(e);
//   } else {
//     console.log("Success");
//   }
// });

// ------Finding in DB--------
Fruit.find((e, fruits) => {
  if (e) {
    console.log(e);
  } else {
    mongoose.connection.close();
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  }
});

// ------Example with person Schema-------
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  skill: String,
  favouriteFruit: fruitSchema,
});

const Person = new mongoose.model("Person", personSchema);

const person = new Person({
  name: "Sanjana",
  age: 21,
  skill: "Programming",
  favouriteFruit: banana,
});

// person.save();

// ------Multiple Delete--------
// Person.deleteMany({ name: "Parv" }, (e) => {});
