import React, { useEffect, useRef } from "react";
import style from "./NetworkGraph.module.css";
import * as d3 from "d3";
import dataUrl from "../data/network.json?url"

const NetworkGraph = ({ width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svgElement = d3.select(svgRef.current);
    
    // Fetch data from JSON file
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        // Define the dimensions of the SVG container
        const width = 800;
        const height = 800;

        // Helper functions
        var radius = d3
        .scaleLinear()
        .domain([2, 8])
        .nice()
        .range([1, 9]);
        
        const color = () => { return "#6C0096"; };

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
          ${d.target.getAttribute("name")} (${d.target.getAttribute("code")})\n
          Happiness: ${d.target.getAttribute("happiness")}\n
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
          .force("charge", d3.forceManyBody().strength(-150))
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("x", d3.forceX())
          .force("y", d3.forceY());

        // Create an SVG container using D3
        const svg = svgElement
          .attr("viewBox", `0 0 ${width} ${height}`)
          .html("");

        // Create a D3 selection for the links
        const link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("stroke", "#999")
        .attr("stroke-width", (d) => d.value);

        // Create a D3 selection for the nodes
        const node = svg
          .selectAll("circle")
          .data(data.nodes)
          .enter()
          .append("circle")
          .attr("fill", color)
          .attr("r", (d) => radius(d.happiness)) // Set node radius
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

        const label = svg
          .append("g")
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
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  return <svg ref={svgRef} height={height} width={width} />;
};

export default NetworkGraph;
