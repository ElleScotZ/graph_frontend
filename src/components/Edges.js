import React from "react";
import Edge from "./Edge";
import "../styles/Edge.scss";

const Edges = ({ edges, nodes, addEdge, removeEdge, updateEdge }) => {
  return (
    <div className="edgesMenu">
      <div className="edgesContainer">
        {edges.map((item) => (
          <Edge
            key={item.id}
            id={item.id}
            _source={item.source}
            _target={item.target}
            _weight={item.weight}
            color={item.color}
            nodes={nodes}
            removeEdge={removeEdge}
            updateEdge={updateEdge}
          />
        ))}
        <div className="edge addNew" onClick={addEdge}>
          <div className="addNew__text">Add New</div>
        </div>
      </div>
    </div>
  );
};

export default Edges;
