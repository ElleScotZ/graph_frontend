import "../styles/AnalysisInput.scss";

const AnalysisInputs = ({
  nodes,
  node1,
  setNode1,
  node2,
  setNode2,
  maxEdges,
  setMaxEdges,
  maxWeightParam,
  setMaxWeightParam,
  exactValues,
  setExactValues,
  solutions,
  selectedSolution,
  setSelectedSolution,
}) => {
  return (
    <div className="analysisParameters">
      <div className="param">
        <span>Node 1</span>
        <select
          className="paramInput"
          defaultValue={node1}
          onChange={(e) => setNode1(e.target.value)}
        >
          {nodes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="param">
        <span>Node 2</span>
        <select
          className="paramInput"
          defaultValue={node2}
          onChange={(e) => setNode2(e.target.value)}
        >
          {nodes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="param">
        <span>Max Edges</span>
        <input
          className="paramInput"
          type="number"
          min="0"
          value={maxEdges}
          onChange={(e) => setMaxEdges(e.target.value)}
        />
      </div>
      <div className="param">
        <span>Max Weight</span>
        <input
          className="paramInput"
          type="number"
          min="0"
          value={maxWeightParam}
          onChange={(e) => setMaxWeightParam(e.target.value)}
        />
      </div>
      <div className="param">
        <span>Exact Values</span>
        <input
          checked={exactValues}
          className="paramInput"
          type="checkbox"
          onChange={(e) => setExactValues(e.target.checked)}
        />
      </div>
      {solutions.length > 1 && (
        <div className="param param__solution">
          <span>Solution</span>
          <select
            className="paramInput"
            defaultValue={selectedSolution}
            onChange={(e) => setSelectedSolution(e.target.value)}
          >
            {solutions.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {`Solution #${index + 1}`}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default AnalysisInputs;
