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
        const height = 400;

        var radius = d3
        .scaleLinear()
        .domain([2, 8])
        .nice()
        .range([1, 9]);
        
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

        const color = () => { return "#6C0096"; };
        
        // Create a new D3 force simulation
        const simulation = d3
          .forceSimulation()
          .force("link", d3.forceLink().id((d) => d.id))
          .force("charge", d3.forceManyBody().strength(-5))
          .force("center", d3.forceCenter(width / 2, height / 2));

        // Create an SVG container using D3
        const svg = svgElement
          .attr("viewBox", `0 0 ${width} ${height}`)
          .html("")
          .call(d3.zoom().on("zoom", function () { // doesn't work
            svg.attr("transform", d3.event.transform);
          }));

        // Create a D3 selection for the links
        const link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", (d) => d.value);

        // Create a D3 selection for the nodes
        const node = svg
          .selectAll("circle")
          .data(data.nodes)
          .enter()
          .append("circle")
          .attr("r", (d) => radius(d.happiness[2023])) // Set node radius
          .attr("fill", color)
          .attr("x", (d) => d.longitude)
          .attr("y", (d) => d.latitude)
          .call(drag(simulation))

        // Add labels to the nodes
        node.append("title").text((d) => d.name + ": " + d.happiness[2023]);

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
