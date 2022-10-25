import React from "react";
import "../styles/Directed.scss";

const Directed = ({ isDirected, setIsDirected }) => {
  return (
    <div className="directed menu-item">
      <label>
        <input
          className="directed__checkbox"
          type="checkbox"
          checked={isDirected}
          onChange={(e) => setIsDirected(e.target.checked)}
        />
        Directed Graph
      </label>
    </div>
  );
};

export default Directed;
