const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//----------- Mongoose Connection -----------
// mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//----------- Mongoose DB Schema -----------
const itemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemsSchema);

//----------- Mongoose Items Creation-----------
const item1 = new Item({ name: "Welcome to your Todolist!" });
const item2 = new Item({ name: "Hit + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete a item" });
const defaultItems = [item1, item2, item3];

//----------- Custome List schema -----------
const listSchema = new mongoose.Schema({ name: String, items: [itemsSchema] });
const List = mongoose.model("List", listSchema);

//----------- Get Route to Root -----------
app.get("/", (req, res) => {
  Item.find({}, (e, foundItems) => {
    if (foundItems.length === 0) {
      // ----------- Mongoose Items Creation-----------
      Item.insertMany(defaultItems, (e) => {
        if (e) {
          console.log(e);
        } else {
          console.log("Successfully added items in the DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", items: foundItems });
    }
  });
});

//----------- Adding new element to DB -----------
app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({ name: itemName });
  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (e, foundList) => {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

//----------- Creating a new list on-the-fly -----------
app.get("/:customListName", (req, res) => {
  const customeListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customeListName }, (e, result) => {
    if (!e) {
      if (!result) {
        //----------- Creating a new list on DB -----------
        const list = new List({ name: customeListName, items: defaultItems });
        list.save();
        res.redirect("/" + customeListName);
      } else {
        //----------- Use existing list value from DB -----------
        res.render("list", { listTitle: result.name, items: result.items });
      }
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

//----------- Deleting check elements from DB -----------
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (
      err,
      foundList
    ) {
      if (!err) {
        console.log(checkedItemId, listName, foundList);
        res.redirect("/" + listName);
      }
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
