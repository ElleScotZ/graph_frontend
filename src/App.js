import React, { useState } from "react";
import Menu from "./components/Menu";
import guid from "./utilities/guid";
import Graph from "./components/Graph";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

export default function App() {
  const [isDirected, setIsDirected] = useState(false);

  // Nodes
  const [nodes, setNodes] = useState([
    { id: 0, name: "A" },
    { id: 1, name: "B" },
  ]);

  const addNode = () => {
    // Returns an uppercase character next in the alphabet.
    const getName = (id) => {
      return String.fromCharCode(65 + id);
    };

    setNodes([...nodes, { id: nodes.length, name: getName(nodes.length) }]);
  };

  const removeNode = () => {
    // Copy nodes and remove last element.
    let nodesCopy = [...nodes];
    const removed = nodesCopy.pop();

    // Remove edges with this node.
    setEdges(
      edges.filter((item) => !(item.source || item.target === removed.id))
    );

    setNodes(nodesCopy);
  };

  // Edges
  const [edges, setEdges] = useState([
    {
      id: guid(),
      source: 0,
      target: 1,
      weight: 20,
      color: "#fff",
    },
  ]);

  const addEdge = () => {
    setEdges([
      ...edges,
      { id: guid(), source: 0, target: 1, weight: 20, color: "#fff" },
    ]);
  };

  const removeEdge = (e, id) => {
    let newEdges = edges.filter((item) => item.id !== id);

    setEdges(newEdges);
  };

  const updateEdges = (newEdges) => {
    let updated = edges.map((item) => {
      if (newEdges.includes(item.id)) {
        item.source = parseInt(newEdges.source);
        item.target = parseInt(newEdges.target);
        item.weight = newEdges.weight;
        item.color = newEdges.color;
      }

      return item;
    });

    setEdges(updated);
  };

  const updateEdge = (e, edge) => {
    let updated = edges.map((item) => {
      if (item.id === edge.id) {
        item.source = parseInt(edge.source);
        item.target = parseInt(edge.target);
        item.weight = edge.weight;
        item.color = edge.color;
      }

      return item;
    });

    setEdges(updated);
  };

  return (
    <div className="main">
      <Menu
        edges={edges}
        nodes={nodes}
        addEdge={addEdge}
        removeEdge={removeEdge}
        addNode={addNode}
        removeNode={removeNode}
        updateEdge={updateEdge}
        isDirected={isDirected}
        setIsDirected={setIsDirected}
      />
      <div className="right">
        <Graph
          edges={edges}
          updateEdges={updateEdges}
          nodes={nodes}
          isDirected={isDirected}
        />
      </div>
    </div>
  );
}
