import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShoppingLists from "./components/ShoppingLists";
import ShoppingListDetail from "./components/ShoppingListDetail";
import CreateEditShoppingList from "./components/CreateEditShoppingList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ShoppingLists} />
          <Route path="/list/:id" component={ShoppingListDetail} />
          <Route path="/create" component={CreateEditShoppingList} />
          <Route path="/edit/:id" component={CreateEditShoppingList} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
