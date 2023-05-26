import React, { useEffect, useRef, useState } from "react";
import style from "./NetworkGraph.module.css";
import * as d3 from "d3";
import dataUrl from "../data/network.json?url"

const NetworkGraph = ({ width, height, variable }) => {
  const [data, setData] = useState(null);

  const [minVar, setMinVar] = useState(0);
  const [maxVar, setMaxVar] = useState(10);

  const [minLink, setMinLink] = useState(0);
  const [maxLink, setMaxLink] = useState(5);

  const svgRef = useRef();
  const gRef = useRef();

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
    .select(gRef.current)
    //.append("g")
    //.attr("cursor", "grab");

    const handleZoom = (e) => gElement.attr('transform', e.transform);

    const zoom = d3.zoom()
    .translateExtent([[-width/2, -height/2], [width/2, height/2]])
    .scaleExtent([0.5, 5])
    .on('zoom', handleZoom);

    svgElement
    .attr("viewBox", [0, 0, width, height])
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(0.55));
  }, []);


  useEffect(() => {
    if (!data) return;

    // Set the min and max values for the variable
    setMinVar(d3.min(data.nodes, (d) => d[variable]));
    setMaxVar(d3.max(data.nodes, (d) => d[variable]));

    // Set the min and max values for the link
    setMinLink(d3.min(data.links, (d) => d.value));
    setMaxLink(d3.max(data.links, (d) => d.value));

    const gElement = d3.select(gRef.current);

    // Helper functions
    var radius = d3
    .scaleLinear()
    .domain([minVar, maxVar])
    .nice()
    .range([3, 12]);
    
    const color = () => { return "#6C0096"; };

    function linkColor(input) {
      // Map the input value to the color range
      const mappedValue = 1 - (input - minLink) / (maxLink - minLink);
    
      // Calculate the gray color value based on mapped value
      const hue = Math.round(mappedValue * 145);
    
      // Generate the hsl color string
      const color = `hsl(${hue}, 100%, 50%)`;
    
      return color;
    }

    function flag(countryCode) {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
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
    }

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
      .force("center", d3.forceCenter(0,0))
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
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("fill", color)
      .attr("r", (d) => radius(d[variable])) // Set node radius
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
      .call(drag(simulation))

    const label = gElement
      .attr("class", "labels")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text(d => flag(d.code))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .call(drag(simulation));

    node.on("mouseover", (d) => {
      addTooltip(d);
    })
      .on("mouseout", () => {
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

      node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
      
    // update label positions
    label
      .attr("x", d => { return d.x; })
      .attr("y", d => { return d.y; })
    });

    simulation.force("link").links(data.links);
  }, [variable, data]);

  return <svg width={width} ref={svgRef}>
          <g ref={gRef} />
        </svg>
};

export default NetworkGraph;
