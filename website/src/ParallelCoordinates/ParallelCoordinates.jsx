import { useEffect, useRef, useState } from "react";
import style from "./ParallelCoordinates.module.css";
import * as d3 from "d3";
import data2023Url from "../data/data_2023.csv?url";


const ParallelCoordinates = () => {
    const svgRef = useRef();
    const linesRef = useRef();
    const axesRef = useRef();
    const [data, setData] = useState(null);
    const [selections, setSelections] = useState({});
    const color = d3.scaleSequential().domain([8, 1]).nice().interpolator(d3.interpolateInferno);
    const margin = { top: 30, right: 80, bottom: 10, left: 80 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        brushWidth = 20;

    useEffect(() => {
        d3.csv(data2023Url)
            .then((scores) => setData(scores))
            .catch((err) => console.error("Error loading 2023 data", err));
    }, []);

    useEffect(() => {
        if (!data) return;
        const dimensions = [{ key: "happiness_score", name: "Happiness score" }, { key: "social_support", name: "Social support" }, { key: "life_expectancy", name: "Life expectancy" }, { key: "freedom", name: "Freedom" }, { key: "gdp", name: "GDP" }, { key: "corruption", name: "Corruption" }, { key: "generosity", name: "Generosity" }];
        var y = {}
        for (const dimension of dimensions) {
            y[dimension.key] = d3.scaleLinear()
                .domain(d3.extent(data, d => +d[dimension.key]))
                .nice()
                .range([height, 0]);
        }
        const x = d3.scalePoint()
            .range([0, width])
            .domain(dimensions.map(d => d.key));

        function path(d) {
            return d3.line().curve(d3.curveCatmullRom)(dimensions.map(dimension => [x(dimension.key), y[dimension.key](d[dimension.key])]));
        }

        const myPath = d3.select(linesRef.current)
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", d => color(d["happiness_score"]))
            .style("stroke-width", 1.5)
            .style("opacity", 1)
        //    .on("mouseover", function (e, d) {
        //        d3.select(this).raise().style("stroke-width", 10).transition().duration(200).style("opacity", 1)
        //    })
        //    .on("mouseleave", function (e, d) {
        //        d3.select(this).style("stroke-width", 2).transition().duration(200).style("opacity", 0.6)
        //    });

        const brushed = function (event, dim) {
            setSelections(oldSelections => {
                const newSelections = { ...oldSelections };
                const { selection } = event;
                if (selection === null) {
                    delete newSelections[dim.key];
                }
                else newSelections[dim.key] = selection.map(y[dim.key].invert).sort((a, b) => a - b);
                return newSelections;
            });
        }

        const brush = d3.brushY()
            .extent([
                [-brushWidth / 2, 0],
                [brushWidth / 2, height]
            ])
            .on("start brush end", brushed);


        d3.select(axesRef.current)
            .selectAll("g")
            .data(dimensions)
            .enter()
            .append("g")
            .attr("class", style.axis)
            .attr("transform", function (d) { return `translate(${x(d.key)})` })
            .each(function (d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d.key])); })
            .call(brush)
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function (d) { return d.name; })
            .style("fill", "black")
    }, [data]);

    useEffect(() => {
        const isSelected = (d) => Object.keys(selections).every(key => d[key] >= selections[key][0] && d[key] <= selections[key][1]);
        d3.select(linesRef.current)
            .selectAll("path")
            .style("stroke", d => isSelected(d) ? color(d["happiness_score"]) : "grey")
            .style("opacity", d => isSelected(d) ? 1 : 0.05);
    }, [selections]);

    return (
        <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <g ref={linesRef} />
                <g ref={axesRef} />
            </g>
        </svg>
    );

}

export default ParallelCoordinates;