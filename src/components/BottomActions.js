import toImg from "react-svg-to-image";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "../styles/BottomActions.scss";

const BottomActions = ({
  handleMaxSteps,
  handleMaxWeight,
  handleHighestWeightPath,
  handleLowestWeightPath,
  handleShortestPath,
  hanldeLongestPath,
  resetEdges,
  setSolutions,
  setSelectedSolution
}) => {
  const downloadPNG = () => {
    toImg("#graphSvg", "graph", {
      format: "png",
      download: true,
    });
  };

  const handleReset = () => {
    resetEdges();

    setSolutions([]);
    setSelectedSolution(0);
  };

  return (
    <div className="actionMenus">
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="analysisDropdown">
          Analysis Tools
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleMaxSteps}>Max Edges</Dropdown.Item>
          <Dropdown.Item onClick={handleMaxWeight}>Max Weight</Dropdown.Item>
          <Dropdown.Item onClick={handleHighestWeightPath}>
            Highest Weight Path
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLowestWeightPath}>
            Lowest Weight Path
          </Dropdown.Item>
          <Dropdown.Item onClick={handleShortestPath}>
            Shortest Path
          </Dropdown.Item>
          <Dropdown.Item onClick={hanldeLongestPath}>
            Longest Path
          </Dropdown.Item>
          <Dropdown.Item onClick={handleReset}>Reset</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div>
        <Button onClick={downloadPNG}>Download Graph</Button>
      </div>
    </div>
  );
};

export default BottomActions;
