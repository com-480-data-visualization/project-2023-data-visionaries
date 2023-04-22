import { useEffect, useRef, useState } from "react"
import style from "./Correlation.module.css"
//import data from "../data"
import * as d3 from "d3";

const CorrelationGraph = (props) => {
    const ref = useRef()
    const [data, setData] = useState(null)
    const [variable, setVariable] = useState("social_support")

    const margin = { top: 10, right: 30, bottom: 30, left: 60 }
    const width = 500 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom;

    const colors = {
        "gdp": "#F9874E",
        "social_support": "#FAC758",
        "life_expectancy": "#8CC788",
        "freedom": "#53B3A6",
        "generosity": "#6691CC",
        "corruption": "#C587C4"
    }

    useEffect(() => {
        d3.csv('/data_2023.csv').then((csv_data) => setData(csv_data)).catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        var coordinates = []
        if (data !== null) {
            coordinates = data.map(d => [d[variable], d['happiness_score']]).sort((a, b) => a[1] - b[1])
        }

        var svg = d3.select(ref.current).html("")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var domainUpperY = Math.max(...coordinates.map(c => c[1]))
        var domainUpperX = Math.max(...coordinates.map(c => c[0]))
        var domainLowerY = Math.min(...coordinates.map(c => c[1]))
        var domainLowerX = Math.min(...coordinates.map(c => c[0]))

        var x = d3.scaleLinear()
            .domain(variable == "generosity" ? [domainLowerX, domainUpperX] : [0, domainUpperX])
            .nice()
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .domain([0, domainUpperY])
            .nice()
            .range([height, 0]);
        svg.append("g")
            .attr("transform", variable == "generosity" ? "translate(" + x(0) + ", 0 )" : "none")
            .call(d3.axisLeft(y));

        svg.selectAll("circle")
            .data(coordinates)
            .enter()
            .append('circle')
            .attr("cx", function (d) { return x(d[0]); })
            .attr("cy", function (d) { return y(d[1]); })
            .attr("r", "4")
            .style("fill", colors[variable])
            .attr("class", function (d) { return style.circle; })
            .on("mouseenter", function (d) {
                d3.select(this).style("r", 8).raise()
            })
            .on("mouseleave", function (d) {
                d3.select(this).style("r", 4)
            })
            .style("opacity", 0)
            .transition()
            .delay(function (d, i) { return i * 15 })
            .duration(0.1)
            .style("opacity", 1);
    }, [data, variable])


    return (<>
        <div className={style.buttonContainer}>
            {Object.keys(colors).map(variable => <button style={{ backgroundColor: `${colors[variable]}` }} className={style.button} onClick={() => setVariable(variable)}>{variable}</button>)}
        </div>
        <div className={style.graph}>
            <p className={style.graphTitle}>{variable}</p>
            <div ref={ref} className={style.svgGraph}>
            </div>
        </div>


    </>
    )
}

export default CorrelationGraph