import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";

const CreateEditShoppingList = () => {
  const [name, setName] = useState("");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // IF ID IS PRESENT - GET request to fetch data
    if (id) {
      axios
        .get(`https://nakupni-seznamy-backend.onrender.com/api/lists/${id}`)
        .then((response) => setName(response.data.name))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // IF ID IS PRESENT - UPRAVIT
    if (id) {
      axios
        .put(`https://nakupni-seznamy-backend.onrender.com/api/lists/${id}`, {
          name,
        })
        .then(() => history.push("/"))
        .catch((error) => console.error(error));
    }
    // IF ID IS NOT PRESENT - VYTVORIT
    else {
      axios
        .post("https://nakupni-seznamy-backend.onrender.com/api/lists", {
          name,
        })
        .then(() => history.push("/"))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <Link to="/" className="back">
        &#x2190; Zpět
      </Link>
      <h2>
        {/* IF ID IS/IS NOT PRESENT - ZMENIT/VYTVORIT */}
        {id ? "Změnit" : "Vytvořit"} nákupní <span>s</span>eznam
      </h2>
      <div className="zmenit-form">
        <form onSubmit={handleSubmit}>
          <input
            className="vytvorit-input"
            type="text"
            value={name}
            placeholder="Název seznamu"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" className="vytvorit-button">
            {/* IF ID IS/IS NOT PRESENT - ZMENIT/VYTVORIT */}
            {id ? "Změnit název" : "Vytvořit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShoppingList;
