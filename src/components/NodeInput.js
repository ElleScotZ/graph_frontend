import "../styles/NodeInput.scss";

const NodeInput = ({ nodes, addNode, removeNode }) => {
  const incrementNodesCount = () => {
    if (nodes.length < 15) {
      addNode();
    }
  };

  const decrementNodesCount = () => {
    if (nodes.length > 2) {
      removeNode();
    }
  };

  return (
    <div className="nodes menu-item">
      <div>Number of Nodes:</div>
      <div className="nodeCounter">
        <button className="nodeCounter__minus" onClick={decrementNodesCount}>
          -
        </button>
        <div className="nodeCounter__count">
          <span>{nodes.length}</span>
        </div>
        <button className="nodeCounter__plus" onClick={incrementNodesCount}>
          +
        </button>
      </div>
      <div className="nodeLabels">
        <div className="nodeLabels__minus">min: 2</div>
        <div className="nodeLabels__divider"></div>
        <div className="nodeLabels__plus">max: 15</div>
      </div>
    </div>
  );
};

export default NodeInput;
