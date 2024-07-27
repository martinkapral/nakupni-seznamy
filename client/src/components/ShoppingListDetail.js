import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { RxCross2 } from "react-icons/rx";

const ShoppingListDetail = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    axios
      .get(`https://nakupni-seznamy-backend.onrender.com/api/lists/${id}`)
      .then((response) => setList(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const addItem = () => {
    if (newItem && !list.items.includes(newItem)) {
      axios
        .post(
          `https://nakupni-seznamy-backend.onrender.com/api/lists/${id}/items`,
          { item: newItem }
        )
        .then((response) => setList(response.data))
        .catch((error) => console.error(error));
      setNewItem("");
    }
  };

  const removeItem = (item) => {
    axios
      .delete(
        `https://nakupni-seznamy-backend.onrender.com/api/lists/${id}/items`,
        { data: { item } }
      )
      .then((response) => setList(response.data))
      .catch((error) => console.error(error));
  };

  if (!list)
    return (
      <div className="not-found-container">
        <h2>Načítání...</h2>
      </div>
    );

  return (
    <div>
      <Link to="/" className="back">
        &#x2190; Zpět
      </Link>
      <h2>{list.name}</h2>
      <input
        type="text"
        className="pridat-input"
        placeholder="Položka"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem} className="pridat-button">
        Přidat
      </button>
      <ul>
        {list.items.map((item, index) => (
          <li key={index} className="polozka">
            <button onClick={() => removeItem(item)} className="smazat-item">
              <RxCross2 />
            </button>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListDetail;
