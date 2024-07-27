const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let shoppingLists = [];

app.get("/api/lists", (req, res) => {
  res.json(shoppingLists);
});

app.post("/api/lists", (req, res) => {
  const newList = { id: Date.now(), name: req.body.name, items: [] };
  shoppingLists.push(newList);
  res.json(newList);
});

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

app.delete("/api/lists/:id", (req, res) => {
  const listId = Number(req.params.id);
  shoppingLists = shoppingLists.filter((l) => l.id !== listId);
  res.sendStatus(204);
});

app.get("/api/lists/:id", (req, res) => {
  const listId = Number(req.params.id);
  const list = shoppingLists.find((l) => l.id === listId);
  if (list) {
    res.json(list);
  } else {
    res.status(404).send("List not found");
  }
});

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
