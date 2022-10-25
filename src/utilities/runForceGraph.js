import * as d3 from "d3";

const runForceGraph = (container, linksData, nodesData, isDirected) => {
  // Put reds at the bottom
  let reds = [];
  let filteredLinks = linksData.filter((link) => {
    if (link.color !== "#fff") {
      reds.push(link);
      return false;
    }

    return true;
  });
  filteredLinks = filteredLinks.concat(reds);
  console.log(filteredLinks);

  const links = filteredLinks.map((d) => Object.assign({}, d));
  const nodes = nodesData.map((d) => Object.assign({}, d));

  const containerRect = container.getBoundingClientRect();

  const height = containerRect.height;
  const width = containerRect.width;

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(() => 200)
        .strength(0.01)
    )
    .force("charge", d3.forceManyBody().strength(-500))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3.select(container).select("svg");
  svg.selectAll("*").remove();
  svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

  const drag = (simulation) => {
    const dragstarted = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    };

    const dragended = (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  // Links
  const link = svg
    .append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", (d) => d.color)
    .attr("stroke-width", (d) => Math.sqrt(d.weight))
    .call(drag(simulation));

  const labels = links.map((item, idx) => {
    const s = JSON.stringify(link._groups[0][idx].__data__.source.x);
    const t = JSON.stringify(link._groups[0][idx].__data__.target.x);

    item.dir = s > t ? 1 : -1;

    return item;
  });

  const linkLabels = svg
    .append("g")
    .selectAll("line")
    .data(labels)
    .join("text")
    .attr("class", "link-label")
    .attr("font-family", "Arial, Helvetica, sans-serif")
    .attr("fill", "#27bbe8")
    .style("font", "bold 24px Arial")
    .attr("stroke", "#000")
    .attr("stroke-width", "1.25px")
    .attr("dy", (d) => `${d.dir + 0.35}em`)
    .attr("text-anchor", "middle")
    .attr("class", "nodeLabels")
    .text((d) => d.weight);

  // Draw arrow
  if (isDirected) {
    svg
      .append("defs")
      .selectAll("marker")
      .data(links)
      .join("marker")
      .attr("id", (d) => `arrowhead-${d.weight}-${d.color}`)
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", (d) => 44.65 * Math.pow(Math.sqrt(d.weight), -0.654))
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", (d) => d.color) //"#6fc8e3")
      .style("stroke", "none");

    link
      .data(links)
      .attr("marker-end", (d) => `url(#arrowhead-${d.weight}-${d.color})`);
  }

  // Nodes
  const node = svg
    .append("g")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 15)
    .attr("fill", "#27bbe8")
    .call(drag(simulation));

  // Labels
  const label = svg
    .append("g")
    .attr("class", "nodeLabels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .text((d) => d.name)
    .call(drag(simulation));

  simulation.on("tick", () => {
    // Link
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // Link Label
    linkLabels
      .attr("x", (d) => (d.source.x + d.target.x) / 2)
      .attr("y", (d) => (d.source.y + d.target.y) / 2);

    // Node
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    // Label
    label.attr("x", (d) => d.x).attr("y", (d) => d.y);
  });
};

export { runForceGraph };
