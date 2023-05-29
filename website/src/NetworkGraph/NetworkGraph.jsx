import React, { useEffect, useRef, useState } from "react";
import style from "./NetworkGraph.module.css";
import * as d3 from "d3";
import dataUrl from "../data/network.json?url";

const NetworkGraph = ({ width, height, variable }) => {
  const [data, setData] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const hoveredCountryRef = useRef();
  const svgRef = useRef();
  const gRef = useRef();
  const gLegendRef = useRef();

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  useEffect(() => {
    if (!data) return;

    const width = 400;
    const height = 200;

    const minLink = d3.min(data.links, (d) => d[variable]);
    const maxLink = d3.max(data.links, (d) => d[variable]);

    const colorByScore = d3.scaleSequential().domain([maxLink, minLink]).nice().interpolator(d3.interpolateInferno);

    const legendDims = {
      width: 120,
      height: 6,
      margin: {
        h: 6,
        v: 10,
      }
    };

    const svgElement = d3.select(svgRef.current);
    const gElement = d3.select(gRef.current);
    const legendElement = d3.select(gLegendRef.current);

    const handleZoom = (e) => gElement.attr("transform", e.transform);

    const zoom = d3
      .zoom()
      .translateExtent([[-width * 3, -height * 3], [width * 3, height * 3]])
      .scaleExtent([0.15, 5])
      .on("zoom", handleZoom);

    svgElement
      .attr("viewBox", [0, 0, width, height])
      .call(zoom)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.4)
      );

    legendElement.html("");
    const linearGradient = legendElement
      .append("linearGradient")
      .attr("id", "map-gradient");

    linearGradient
      .selectAll("stop")
      .data(colorByScore.ticks().reverse().map((t, i, n) => ({ offset: `${100 * i / (n.length - 1)}%`, color: colorByScore(t) })))
      .enter()
      .append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);

    legendElement
      .append('g')
      .attr("transform", `translate(0, ${height - legendDims.height - legendDims.margin.v})`)
      .append("rect")
      .attr('transform', `translate(${width - legendDims.width - legendDims.margin.h}, 0)`)
      .attr("width", legendDims.width)
      .attr("height", legendDims.height)
      .style("fill", "url(#map-gradient)");

    const axisScale = d3.scaleLinear()
      .domain([colorByScore.domain()[colorByScore.domain().length - 1], colorByScore.domain()[0]])
      .range([width - legendDims.width - legendDims.margin.h, width - legendDims.margin.h - 1])
    const axisBottom = g => g
      .attr("transform", `translate(0, ${height - legendDims.height - legendDims.margin.v})`)
      .style("font-size", "8px")
      .call(d3.axisBottom(axisScale)
        .ticks(legendDims.width / 30)
        .tickSize(2 * legendDims.height / 3))
    legendElement.append('g').call(axisBottom);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const minVar = d3.min(data.nodes, (d) => d[variable]);
    const maxVar = d3.max(data.nodes, (d) => d[variable]);
    const minLink = d3.min(data.links, (d) => d[variable]);
    const maxLink = d3.max(data.links, (d) => d[variable]);

    // Helper functions
    const radius = d3.scaleLinear().domain([minVar, maxVar]).nice().range([2, 25]);

    const gElement = d3.select(gRef.current);

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
      .attr("stroke", (d) => linkColor(d[variable]))
      .attr("stroke-width", 2);

    // Create a D3 selection for the nodes
    const node = gElement
      .selectAll("image")
      .data(data.nodes)
      .enter()
      .append("image")
      .attr("href", (d) => new URL("../resources/circular/" + d.code.toLowerCase() + ".svg", import.meta.url).href)
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
      .call(drag(simulation))
      .on("mouseenter", (e, d) => {
        setHoveredCountry(d.name);
      })
      .on("mousemove", (e, d) => {
        d3.select(hoveredCountryRef.current).style("top", `${e.clientY - 60}px`).style("left", `${e.clientX - 15}px`);
      })
      .on("mouseleave", (e, d) => {
        setHoveredCountry(null);
      })

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
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const minVar = d3.min(data.nodes, (d) => d[variable]);
    const maxVar = d3.max(data.nodes, (d) => d[variable]);
    const minLink = d3.min(data.links, (d) => d[variable]);
    const maxLink = d3.max(data.links, (d) => d[variable]);

    // Helper functions
    const radius = d3.scaleLinear().domain([minVar, maxVar]).nice().range([2, 18]);

    function linkColor(input) {
      // Map the input value to the color range
      const normalizedValue = 1 - (input - minLink) / (maxLink - minLink);

      return d3.interpolateInferno(normalizedValue);
    }

    const gElement = d3.select(gRef.current)
    gElement
      .selectAll("image")
      .transition()
      .duration(400)
      .attr("width", (d) => radius(d[variable])) // Set node width based on radius
      .attr("height", (d) => radius(d[variable])) // Set node height based on radius 
      .attr("x", (d) => -radius(d[variable]) / 2) // Set x position of the top-left corner of the image
      .attr("y", (d) => -radius(d[variable]) / 2) // Set y position of the top-left corner of the image

    gElement
      .selectAll("line")
      .transition()
      .duration(400)
      .attr("stroke", (d) => linkColor(d[variable]))


  }, [data, variable]);

  const getHoveredCountryScore = () => {
    const country = data.nodes.filter(d => d.name == hoveredCountry)[0]
    if (country != undefined)
      return country[variable].toFixed(2);
  }

  return (
    <div>
      <div className={style.tooltip} style={{ visibility: hoveredCountry ? "visible" : "hidden" }} ref={hoveredCountryRef}>
        <p>{hoveredCountry}</p>
        <p>{variable.charAt(0).toUpperCase() + variable.slice(1).replace("_", " ")}: {data && getHoveredCountryScore()}</p>
      </div>
      <svg width={width} height={height} ref={svgRef}>
        <g ref={gRef} />
        <g ref={gLegendRef} />
      </svg>

    </div>

  );
};

export default NetworkGraph;
