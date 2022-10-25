import NodeInput from "./NodeInput";
import Edges from "./Edges";
import Directed from "./Directed";
import "../styles/Menu.scss";

const Menu = ({
  edges,
  nodes,
  addEdge,
  addNode,
  removeNode,
  removeEdge,
  updateEdge,
  isDirected,
  setIsDirected,
}) => {
  return (
    <div className="left">
      <NodeInput nodes={nodes} addNode={addNode} removeNode={removeNode} />
      <Directed isDirected={isDirected} setIsDirected={setIsDirected} />
      <Edges
        edges={edges}
        nodes={nodes}
        addEdge={addEdge}
        removeEdge={removeEdge}
        updateEdge={updateEdge}
      />
    </div>
  );
};

export default Menu;
