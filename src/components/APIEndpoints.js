import { url } from "../constants";

const generateGraph = (nodes, edges) => {
  return {
    nodes: nodes,
    edges: edges,
  };
};

const generateResponse = (graph) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  return {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(graph),
    redirect: "follow",
  };
};

const maxSteps = (nodes, edges, endNodes, maxEdges, exactSteps) => {
  const graph = generateGraph(nodes, edges);

  let query = "";
  query += `?Nodes=${endNodes}`;
  query += `&MaxEdges=${maxEdges}Z`;
  query += `&Exact=${exactSteps}`;

  const fetchUrl = url + "maxSteps" + query;

  var requestOptions = generateResponse(graph);

  return { fetchUrl, requestOptions };
};

const maxWeight = (nodes, edges, endNodes, maxWeight, exactWeight) => {
  const graph = generateGraph(nodes, edges);

  let query = "";
  query += `?Nodes=${endNodes}`;
  query += `&MaxWeight=${maxWeight}Z`; // The Z is redundand, the problem is in the backend API.
  query += `&Exact=${exactWeight}`;

  const fetchUrl = url + "maxWeight" + query;

  var requestOptions = generateResponse(graph);

  return { fetchUrl, requestOptions };
};

const getWeightPath = (nodes, edges, endNodes, lowest) => {
  if (lowest) {
    return getLowestWeightPath(nodes, edges, endNodes);
  } else {
    return getHighestWeightPath(nodes, edges, endNodes);
  }
};

const getLowestWeightPath = (nodes, edges, endNodes) => {
  const graph = generateGraph(nodes, edges);

  let query = "";
  query += `?Nodes=${endNodes}`;
  query += `&Lowest=true`;

  const fetchUrl = url + "highLowWeight" + query;

  var requestOptions = generateResponse(graph);

  return { fetchUrl, requestOptions };
};

const getHighestWeightPath = (nodes, edges, endNodes) => {
  const graph = generateGraph(nodes, edges);

  let query = "";
  query += `?Nodes=${endNodes}`;
  query += `&Lowest=false`;

  const fetchUrl = url + "highLowWeight" + query;

  var requestOptions = generateResponse(graph);

  return { fetchUrl, requestOptions };
};

const getShortestPath = (nodes, edges, endNodes) => {
  const graph = generateGraph(nodes, edges);

  let query = "";
  query += `?Nodes=${endNodes}`;
  query += `&Shortest=true`;

  const fetchUrl = url + "shortLong" + query;

  var requestOptions = generateResponse(graph);

  return { fetchUrl, requestOptions };
};

const getLongestPath = (nodes, edges, endNodes) => {
  const graph = generateGraph(nodes, edges);

  let query = "";
  query += `?Nodes=${endNodes}`;
  query += `&Shortest=false`;

  const fetchUrl = url + "shortLong" + query;

  var requestOptions = generateResponse(graph);

  return { fetchUrl, requestOptions };
};

export {
  maxSteps,
  maxWeight,
  getWeightPath,
  getShortestPath,
  getLongestPath,
};
