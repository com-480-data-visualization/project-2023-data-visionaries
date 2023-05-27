import React, { useEffect, useRef, useState } from "react";
import style from "./NetworkGraph.module.css";
import * as d3 from "d3";
import dataUrl from "../data/network.json?url";

const NetworkGraph = ({ width, height }) => {
  const [data, setData] = useState(null);

  const [variable, setVariable] = useState("corruption")

  const svgRef = useRef();
  const gRef = useRef();

  const colors = {
    "happiness": "#F8AD1A",
    "gdp": "#F8AD1A",
    "social_support": "#F6810C",
    "life_expectancy": "#E34D20",
    "freedom": "#AA2243",
    "generosity": "#6C0D59",
    "corruption": "#3F0059"
  }

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  useEffect(() => {
    const width = 800;
    const height = 800;

    const svgElement = d3
    .select(svgRef.current);
    
    const gElement = d3
    .select(gRef.current);

    const handleZoom = (e) => gElement.attr("transform", e.transform);

    const zoom = d3
      .zoom()
      .translateExtent([[-width / 2, -height / 2], [width / 2, height / 2]])
      .scaleExtent([0.5, 5])
      .on("zoom", handleZoom);

    svgElement
      .attr("viewBox", [0, 0, width, height])
      .call(zoom)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(1.0)
      );
  }, []);

  useEffect(() => {
    if (!data) return;

    const minVar = d3.min(data.nodes, (d) => d[variable]);
    const maxVar = d3.max(data.nodes, (d) => d[variable]);
    const minLink = d3.min(data.links, (d) => d.value);
    const maxLink = d3.max(data.links, (d) => d.value);

    const gElement = d3.select(gRef.current);

    // Helper functions
    var radius = d3.scaleLinear().domain([minVar, maxVar]).nice().range([3, 20]);

    function linkColor(input) {
      // Map the input value to the color range
      const normalizedValue = 1 - (input - minLink) / (maxLink - minLink);

      return d3.interpolateInferno(normalizedValue);
    }

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

    // Add the tooltip element to the graph
    const tooltip = document.querySelector("#graph-tooltip");
    if (!tooltip) {
      const tooltipDiv = document.createElement("div");
      tooltipDiv.classList.add(style.tooltip);
      tooltipDiv.style.opacity = "0";
      tooltipDiv.id = "graph-tooltip";
      document.body.appendChild(tooltipDiv);
    }
    const div = d3.select("#graph-tooltip");

    const nodeHoverTooltip = (d) => {
      return `<div>
      ${d.target.getAttribute("name")} <br />
      ${variable.charAt(0).toUpperCase() + variable.slice(1)}: ${d.target.getAttribute(variable)}\n
      </div>`;
    };

    const addTooltip = (d) => {
      div
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      div
        .html(nodeHoverTooltip(d))
        .style("left", `${d.x - 50}px`)
        .style("top", `${d.y - 50}px`);
    };

    const removeTooltip = () => {
      div
      .transition()
      .duration(200)
      .style("opacity", 0);
    };

    // Create a new D3 force simulation
    const simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink().id((d) => d.id))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(0, 0))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    // Create a D3 selection for the links
    const link = gElement
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", (d) => linkColor(d.value))
      .attr("stroke-width", (d) => 0.5 * d.value);

    // Create a D3 selection for the nodes
    const node = gElement
    .selectAll("image")
    .data(data.nodes)
    .enter()
    .append("image")
    .attr("href", (d) => "src/resources/1x1/" + d.code.toLowerCase() + ".svg")
    .attr("width", (d) => radius(d[variable])) // Set node width based on radius
    .attr("height", (d) => radius(d[variable])) // Set node height based on radius
    .attr("x", (d) => -radius(d[variable]) / 2) // Set x position of the top-left corner of the image
    .attr("y", (d) => -radius(d[variable]) / 2) // Set y position of the top-left corner of the image
    .attr("code", (d) => d.code)
    .attr("name", (d) => d.name)
    .attr("region", (d) => d.region)
    .attr("happiness", (d) => d.happiness)
    .attr("gdp", (d) => d.gdp)
    .attr("social_support", (d) => d.social_support)
    .attr("life_expectancy", (d) => d.life_expectancy)
    .attr("freedom", (d) => d.freedom)
    .attr("generosity", (d) => d.generosity)
    .attr("corruption", (d) => d.corruption)
    .call(drag(simulation));

    node.on("mouseover", (d) => {
      addTooltip(d);
    }).on("mouseout", () => {
      removeTooltip();
    });

    // Update the simulation with the data
    simulation.nodes(data.nodes).on("tick", () => {
      // Update the positions of the links and nodes
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    simulation.force("link").links(data.links);
  }, [variable, data]);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}>
        <g ref={gRef} />
      </svg>
      <div className={style.buttonsContainer}>
        {Object.keys(colors).map(variable => <button key={variable} style={{ backgroundColor: `${colors[variable]}`, color: "white" }} className={style.button} onClick={() => setVariable(variable)}>{variable.replace("_", " ")}</button>)}
      </div>
    </div>
  );
};

export default NetworkGraph;
