import React, { useEffect, useRef } from "react";
import style from "./GraphVisualization.module.css";
import * as d3 from "d3";
import dataUrl from "../data/graph.json?url"

const GraphVisualization = ({ width, height }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Fetch data from JSON file
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        // Define the dimensions of the SVG container
        const width = 800;
        const height = 400;

        // Create a new D3 force simulation
        const simulation = d3
          .forceSimulation()
          .force("link", d3.forceLink().id((d) => d.id))
          .force("charge", d3.forceManyBody().strength(-6))
          .force("center", d3.forceCenter(width / 2, height / 2));

        // Create an SVG container using D3
        const svg = d3
          .select(svgRef.current)
          .attr("viewBox", `0 0 ${width} ${height}`)
          .html("");

        // Create a D3 selection for the links
        const link = svg
          .selectAll("line")
          .data(data.links)
          .enter()
          .append("line")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", (d) => Math.sqrt(d.value));

        var r = d3.scaleLinear()
          .domain([2, 8])
          .nice()
          .range([0, 15]);

        // Create a D3 selection for the nodes
        const node = svg
          .selectAll("circle")
          .data(data.nodes)
          .enter()
          .append("circle")
          .attr("r", (d) => r(d.size)) // Set radius based on "size" attribute
          .attr("fill", "steelblue")
          .call(
            d3
              .drag()
              .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.1).restart();
                d.fx = d.x;
                d.fy = d.y;
              })
              .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
              })
              .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              })
          )
          .on("mouseover", (event, d) => {
            // Show tooltip with node name and size on mouseover
            d3.select("#tooltip")
              .html(`Name: ${d.id}<br/>Size: ${d.size}`)
              .style("opacity", 1)
              .style("left", `${event.x + 10}px`)
              .style("top", `${event.y - 10}px`);
          })
          .on("mouseout", () => {
            // Hide tooltip on mouseout
            d3.select("#tooltip").style("opacity", 0);
          });

        // Add labels to the nodes
        node.append("title").text((d) => d.id);

        // Update the simulation with the data
        simulation.nodes(data.nodes).on("tick", () => {
          // Update the positions of the links and nodes
          link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        });

        simulation.force("link").links(data.links);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  return <svg ref={svgRef} height={height} width={width} />;
};

export default GraphVisualization;