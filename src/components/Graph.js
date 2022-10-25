import React, { useState } from "react";
import * as api from "./APIEndpoints";
import { runForceGraph } from "../utilities/runForceGraph";
import BottomMenu from "./BottomMenu";
import "../styles/Graph.scss";

const Graph = ({ edges, updateEdges, nodes, isDirected }) => {
  const [node1, setNode1] = useState(0);
  const [node2, setNode2] = useState(1);
  const [maxEdges, setMaxEdges] = useState(1);
  const [maxWeightParam, setMaxWeightParam] = useState(40);
  const [exactValues, setExactValues] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [selectedSolution, setSelectedSolution] = useState(0);

  const containerRef = React.useRef(null);

  const invertEdges = (edges) => {
    return edges.map((d) => {
      return {
        id: d.id + "X",
        source: d.target,
        target: d.source,
        weight: d.weight,
      };
    });
  };

  const formatEdges = (links, nodes) => {
    return links.map((d) => {
      const obj = {
        nodes: [
          {
            name: nodes
              .filter((n) => n.id === d.source)
              .map((n) => {
                return n.name;
              })[0],
          },
          {
            name: nodes
              .filter((n) => n.id === d.target)
              .map((n) => {
                return n.name;
              })[0],
          },
        ],
        weight: d.weight,
      };

      return obj;
    });
  };

  const resetEdges = () => {
    const reseted = edges.map((e) => {
      e.color = "#fff";

      return e;
    });

    updateEdges(reseted);
  };

  const getLinkIdFromNodeIds = (nodeIds) => {
    return edges
      .filter((e) => {
        return isDirected
          ? e.source === nodeIds.source[0] && e.target === nodeIds.target[0]
          : (e.source === nodeIds.source[0] &&
              e.target === nodeIds.target[0]) ||
              (e.target === nodeIds.source[0] &&
                e.source === nodeIds.target[0]);
      })
      .map((e) => e.id)[0];
  };

  const getNodeIdFromName = (nodes, name) => {
    return nodes.filter((n) => n.name === name).map((d) => d.id);
  };

  const getNodeNameFromId = (nodes, id) => {
    return nodes.filter((n) => n.id === parseInt(id)).map((d) => d.name);
  };

  const updateGraph = (solutionSelected) => {
    resetEdges();

    let linkIds = [];

    for (let i = 0; i < solutionSelected.edges.length; i++) {
      const nodesData = solutionSelected.edges[i].nodes;

      const nodeIds = {
        source: getNodeIdFromName(nodes, nodesData[0].name),
        target: getNodeIdFromName(nodes, nodesData[1].name),
      };

      linkIds.push(getLinkIdFromNodeIds(nodeIds));
    }

    let updatedEdges = edges
      .filter((e) => {
        return linkIds.includes(e.id);
      })
      .map((e) => {
        e.color = "#f00";

        return e;
      });

    updateEdges(updatedEdges);
  };

  const getFormattedEdges = () => {
    if (isDirected) {
      return formatEdges(edges, nodes);
    }

    const invertedEdges = invertEdges(edges);
    let links = edges.concat(invertedEdges);

    return formatEdges(links, nodes);
  };

  const getFormattedNodes = () => {
    return nodes.map((d) => {
      return { name: d.name };
    });
  };

  const getNodeString = () => {
    return getNodeNameFromId(nodes, node1) + getNodeNameFromId(nodes, node2);
  };

  const handleMaxSteps = async () => {
    const formattedEdges = getFormattedEdges();
    const formattedNodes = getFormattedNodes();
    const nodeString = getNodeString();

    let req = api.maxSteps(
      formattedNodes,
      formattedEdges,
      nodeString,
      maxEdges,
      exactValues
    );

    const response = await fetch(req.fetchUrl, req.requestOptions);
    const text = await response.text();
    if (!response.ok) {
      console.log(text);
      return;
    }
    const json = JSON.parse(text);
    if (!json.length) {
      alert("No solution.");
      return;
    }

    updateGraph(json[0].subgraph);

    setSolutions(json);
  };

  const handleMaxWeight = async () => {
    const formattedEdges = getFormattedEdges();
    const formattedNodes = getFormattedNodes();
    const nodeString = getNodeString();

    let req = api.maxWeight(
      formattedNodes,
      formattedEdges,
      nodeString,
      maxWeightParam,
      exactValues
    );

    const response = await fetch(req.fetchUrl, req.requestOptions);
    const text = await response.text();
    if (!response.ok) {
      console.log(text);
      return;
    }
    const json = JSON.parse(text);
    if (!json.length) {
      alert("No solution.");
      return;
    }

    updateGraph(json[0].subgraph);

    setSolutions(json);
  };

  const handleWeightPath = async (lowest) => {
    const formattedEdges = getFormattedEdges();
    const formattedNodes = getFormattedNodes();
    const nodeString = getNodeString();

    let req = api.getWeightPath(
      formattedNodes,
      formattedEdges,
      nodeString,
      lowest
    );

    const response = await fetch(req.fetchUrl, req.requestOptions);
    const text = await response.text();
    if (!response.ok) {
      console.log(text);
      return;
    }
    const json = JSON.parse(text);
    if (!json) {
      alert("No solution");
      return;
    }

    updateGraph(json[0].subgraph);

    setSolutions(json);
  };

  const handleHighestWeightPath = () => {
    handleWeightPath(false);
  };

  const handleLowestWeightPath = () => {
    handleWeightPath(true);
  };

  const handleShortestPath = async () => {
    const formattedEdges = getFormattedEdges();
    const formattedNodes = getFormattedNodes();
    const nodeString = getNodeString();

    let req = api.getShortestPath(formattedNodes, formattedEdges, nodeString);

    const response = await fetch(req.fetchUrl, req.requestOptions);
    const text = await response.text();
    if (!response.ok) {
      console.log(text);
      return;
    }
    const json = JSON.parse(text);
    if (!json) {
      alert("No solution");
      return;
    }

    updateGraph(json[0].subgraph);

    setSolutions(json);
  };

  const hanldeLongestPath = async () => {
    const formattedEdges = getFormattedEdges();
    const formattedNodes = getFormattedNodes();
    const nodeString = getNodeString();

    let req = api.getLongestPath(formattedNodes, formattedEdges, nodeString);

    const response = await fetch(req.fetchUrl, req.requestOptions);
    const text = await response.text();
    if (!response.ok) {
      console.log(text);
      return;
    }
    const json = JSON.parse(text);
    if (!json) {
      alert("No solution");
      return;
    }

    updateGraph(json[0].subgraph);

    setSolutions(json);
  };

  React.useEffect(() => {
    runForceGraph(containerRef.current, edges, nodes, isDirected);
  }, [edges, nodes, isDirected]);

  React.useEffect(() => {
    // If default, don't do anything.
    if (!solutions.length) {
      return;
    }

    const solutionSelected = solutions[selectedSolution].subgraph;

    updateGraph(solutionSelected);
  }, [selectedSolution]);

  return (
    <div>
      <div ref={containerRef} className="graphContainer">
        <svg id="graphSvg"></svg>
      </div>
      <BottomMenu
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
        handleMaxSteps={handleMaxSteps}
        handleMaxWeight={handleMaxWeight}
        handleHighestWeightPath={handleHighestWeightPath}
        handleLowestWeightPath={handleLowestWeightPath}
        handleShortestPath={handleShortestPath}
        hanldeLongestPath={hanldeLongestPath}
        resetEdges={resetEdges}
        solutions={solutions}
        setSolutions={setSolutions}
        selectedSolution={selectedSolution}
        setSelectedSolution={setSelectedSolution}
      />
    </div>
  );
};

export default Graph;
