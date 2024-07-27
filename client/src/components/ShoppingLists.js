import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ShoppingLists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios
      .get("https://nakupni-seznamy-backend.onrender.com/api/lists")
      .then((response) => setLists(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteList = (id) => {
    axios
      .delete(`https://nakupni-seznamy-backend.onrender.com/api/lists/${id}`)
      .then(() => setLists(lists.filter((list) => list.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>
        Nákupní <span>s</span>eznamy
      </h1>
      <NavLink to="/create" className="vytvorit">
        Vytvořit nákupní seznam
      </NavLink>
      <div className="nakupni-seznamy">
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              <div className="seznamy">
                <NavLink to={`/list/${list.id}`} className="no-decoration item">
                  {list.name}
                </NavLink>

                <div className="ns-buttons">
                  <NavLink to={`/edit/${list.id}`} className="upravit">
                    Upravit
                  </NavLink>
                  <button
                    onClick={() => deleteList(list.id)}
                    className="smazat"
                  >
                    Smazat
                  </button>
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingLists;
