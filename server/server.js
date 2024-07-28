const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let shoppingLists = [];

// GET ALL SHOPPING LISTS - in JSON
app.get("/api/lists", (req, res) => {
  res.json(shoppingLists);
});

// CREATE NEW SHOPPING LIST - unique ID, NAME, ITEMS array
app.post("/api/lists", (req, res) => {
  const newList = { id: Date.now(), name: req.body.name, items: [] };
  shoppingLists.push(newList);
  res.json(newList);
});

// UPDATE THE NAME OF A LIST - by ID
app.put("/api/lists/:id", (req, res) => {
  const listId = Number(req.params.id);
  const list = shoppingLists.find((l) => l.id === listId);
  if (list) {
    list.name = req.body.name;
    res.json(list);
  } else {
    res.status(404).send("List not found");
  }
});

// DELETE SHOPPING LIST by ID
app.delete("/api/lists/:id", (req, res) => {
  const listId = Number(req.params.id);
  shoppingLists = shoppingLists.filter((l) => l.id !== listId);
  res.sendStatus(204);
});

// GET A SINGLE LIST by ID
app.get("/api/lists/:id", (req, res) => {
  const listId = Number(req.params.id);
  const list = shoppingLists.find((l) => l.id === listId);
  if (list) {
    res.json(list);
  } else {
    res.status(404).send("List not found");
  }
});

// ADDING ITEM TO A LIST (BUT NO DUPLICATES)
app.post("/api/lists/:id/items", (req, res) => {
  const listId = Number(req.params.id);
  const list = shoppingLists.find((l) => l.id === listId);
  if (list) {
    const newItem = req.body.item;
    if (!list.items.includes(newItem)) {
      list.items.push(newItem);
      res.json(list);
    } else {
      res.status(400).send("Item already exists");
    }
  } else {
    res.status(404).send("List not found");
  }
});

// REMOVE ITEM FROM A SHOPPING LIST
app.delete("/api/lists/:id/items", (req, res) => {
  const listId = Number(req.params.id);
  const list = shoppingLists.find((l) => l.id === listId);
  if (list) {
    const item = req.body.item;
    list.items = list.items.filter((i) => i !== item);
    res.json(list);
  } else {
    res.status(404).send("List not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
