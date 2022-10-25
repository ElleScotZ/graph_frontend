import React, { useState } from "react";
import "../styles/Edge.scss";

const Edge = ({
  nodes,
  id,
  _source,
  _target,
  _weight,
  color,
  removeEdge,
  updateEdge,
}) => {
  const [weight, setWeight] = useState(_weight);
  const [source, setsource] = useState(_source);
  const [target, settarget] = useState(_target);

  let edge = {
    id: id,
    source: _source,
    target: _target,
    weight: _weight,
    color: color,
  };

  const handleWeight = (e) => {
    if (!(e.target.value <= 100 && e.target.value > 0)) return;

    setWeight(e.target.value);
    edge.weight = parseInt(e.target.value);
    updateEdge(e, edge);
  };

  const handlesource = (e) => {
    setsource(e.target.value);
    edge.source = e.target.value;
    updateEdge(e, edge);
  };

  const handletarget = (e) => {
    settarget(e.target.value);
    edge.target = e.target.value;
    updateEdge(e, edge);
  };

  return (
    <div className="edge">
      <div className="removeEdge">
        <button
          className="removeEdgeButton"
          onClick={(e) => removeEdge(e, id)}
        ></button>
      </div>

      <div className="edges">
        <span>Node 1</span>
        <select
          className="edgeInput"
          id={`source_edge${id}`}
          onChange={handlesource}
          defaultValue={source}
        >
          {nodes
            .filter((item) => item.id !== _target)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="edges">
        <span>Node 2</span>
        <select
          className="edgeInput"
          id={`target_edge${id}`}
          onChange={handletarget}
          defaultValue={target}
        >
          {nodes
            .filter((item) => item.id !== _source)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="edges">
        <span>Weight</span>
        <input
          className="edgeInput"
          type="number"
          min="1"
          max="100"
          value={weight}
          onChange={handleWeight}
        />
      </div>
    </div>
  );
};

export default Edge;
