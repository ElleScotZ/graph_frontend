import AnalysisInputs from "./AnalysisInputs";
import BottomActions from "./BottomActions";
import "../styles/BottomMenu.scss";

const BottomMenu = ({
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
  handleMaxSteps,
  handleMaxWeight,
  handleHighestWeightPath,
  handleLowestWeightPath,
  handleShortestPath,
  hanldeLongestPath,
  resetEdges,
  solutions,
  setSolutions,
  selectedSolution,
  setSelectedSolution,
}) => {
  return (
    <div className="bottomMenu">
      <AnalysisInputs
        nodes={nodes}
        node1={node1}
        setNode1={setNode1}
        node2={node2}
        setNode2={setNode2}
        maxEdges={maxEdges}
        setMaxEdges={setMaxEdges}
        maxWeightParam={maxWeightParam}
        setMaxWeightParam={setMaxWeightParam}
        exactValues={exactValues}
        setExactValues={setExactValues}
        solutions={solutions}
        selectedSolution={selectedSolution}
        setSelectedSolution={setSelectedSolution}
      />
      <BottomActions
        handleMaxSteps={handleMaxSteps}
        handleMaxWeight={handleMaxWeight}
        handleHighestWeightPath={handleHighestWeightPath}
        handleLowestWeightPath={handleLowestWeightPath}
        handleShortestPath={handleShortestPath}
        hanldeLongestPath={hanldeLongestPath}
        resetEdges={resetEdges}
        setSolutions={setSolutions}
        setSelectedSolution={setSelectedSolution}
      />
    </div>
  );
};

export default BottomMenu;
