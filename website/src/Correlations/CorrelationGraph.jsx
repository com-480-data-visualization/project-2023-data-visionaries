import { useEffect, useRef, useState } from "react"
import style from "./Correlation.module.css"
import * as d3 from "d3";
import dataUrl from "../data/data_2023.csv?url"

const CorrelationGraph = ({ width, height }) => {
    const ref = useRef()
    const hoveredCountryRef = useRef();
    const [data, setData] = useState(null)
    const [variable, setVariable] = useState("gdp")
    const [hoveredCountry, setHoveredCountry] = useState(null);


    const colors = {
        "gdp": "#F8AD1A",
        "social_support": "#F6810C",
        "life_expectancy": "#E34D20",
        "freedom": "#AA2243",
        "generosity": "#6C0D59",
        "corruption": "#3F0059"
    }

    const gdp = <p>Gross domestic product (GDP) per capita is a financial metric that breaks down a country's economic output per person. It is a global measure of the prosperity of nations and is used by economists, along with GDP, to analyze the prosperity of a country based on its economic growth. <br /><br />Since GDP per capita considers both a country's GDP and its population, small, rich countries and more developed industrial countries tend to have the highest GDP per capita.</p>;
    const ss = <div>Social support is a metric that indicates if individuals have someone to count on in times of trouble. It is calculated as national average of the binary responses to the GWP question
        <p className={style.question} style={{ color: colors[variable] }}>
            “If you were in trouble, do you have relatives or friends you can count on to help you whenever you need them, or not?”</p>
    </div>;
    const le = <p>Health life expectancy, measured by World Health Organisation is by definition average number of years that a person can expect to live in “full health” by taking into account years lived in less than full health due to disease and/or injury.</p>;
    const free = <div>Freedom to make life choices is a metric that indicates satisfaction with freedom in life. It is a subjective measure depending of individuals perception of their lives. It is calculated as national average of responses to GWP question:
        <p className={style.question} style={{ color: colors[variable] }}>“Are you satisfied or dissatisfied with your freedom to choose what you do with your life?”</p>
    </div>;
    const gen = <div>Generosity is a metric that measures people’s largess and munificence. It is calculated as the residual of regression between national average of response to the GWP question and GDP per capita. The question asked in the survey is:
        <p className={style.question} style={{ color: colors[variable] }}>“Have you donated money to a charity in the past month?”</p>
    </div>;
    const corr = <div>
        The Corruption Perception measure is the national average of the average survey responses to two binary questions in the GWP:
        <p className={style.question} style={{ color: colors[variable] }}>“Is corruption widespread throughout the government or not”</p> <p style={{ textAlign: "center" }}>and</p> <p className={style.question} style={{ color: colors[variable] }}>“Is corruption widespread within businesses or
            not?” </p>
    </div>;
    const happy = <p>Happiness score is subjective well-being of individuals in one country. The score is measured using survey released by Gallup World Poll. The final score is the national average response to the question of life evaluations. The question asked in the survey is: "Please imagine a ladder, with steps numbered from 0 at the bottom to 10 at the top. The top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you. On which step of the ladder would you say you personally feel you stand at this time?" </p>
    const texts = {
        "gdp": gdp,
        "social_support": ss,
        "life_expectancy": le,
        "freedom": free,
        "generosity": gen,
        "corruption": corr
    }

    useEffect(() => {
        d3.csv(dataUrl).then((csv_data) => setData(csv_data)).catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        var coordinates = []
        if (data !== null) {
            coordinates = data.map(d => [d[variable], d['happiness_score'], d['country']]).sort((a, b) => a[1] - b[1])
        }

        const margin = { top: 10, right: 30, bottom: 30, left: 30 }
        const height = 400 - margin.top - margin.bottom
        const width = 500 - margin.left - margin.right
        var svg = d3.select(ref.current).html("")
            .attr("viewBox", `0 0 500 400`)
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
            .attr("transform", variable == "generosity" ? "translate(" + x(0) + ", 0 )" : "")
            .call(d3.axisLeft(y));

        svg.selectAll("circle")
            .data(coordinates)
            .enter()
            .append('circle')
            .attr("cx", function (d) { return x(d[0]); })
            .attr("cy", function (d) { return y(d[1]); })
            .attr("r", "4")
            .style("fill", colors[variable])
            .attr("className", function (d) { return style.circle; })
            .on("mouseenter", function (d, i) {
                setHoveredCountry(i[2]);
                d3.select(this).style("r", 8).raise()
                d3.select(this).style("fill", "#999")
            })
            .on("mousemove", (d, i) => {
                d3.select(hoveredCountryRef.current).style("left", `${d.clientX}px`).style("top", `${d.clientY - 50}px`);
            })
            .on("mouseleave", function (d) {
                setHoveredCountry(null);
                d3.select(this).style("r", 4)
                d3.select(this).style("fill", colors[variable])
            })
            .style("opacity", 0)
            .transition()
            .delay(function (d, i) { return i * 15 })
            .duration(0.1)
            .style("opacity", 1);
    }, [data, variable])


    return (
        <div className={style.correlationContainer}>
            <p style={{ position: "absolute", background: "white", padding: "2px", border: "1px solid black", borderRadius: "5px", visibility: hoveredCountry ? "visible" : "hidden" }} ref={hoveredCountryRef}>{hoveredCountry ? hoveredCountry : null}</p>
            <div className={style.container}>
                <svg height={height} width={width} ref={ref} />
                <div className={style.text}>{texts[variable]}</div>
            </div>
            <div className={style.buttonsContainer}>
                {Object.keys(colors).map(variable => <button key={variable} style={{ backgroundColor: `${colors[variable]}`, color: "white" }} className={style.button} onClick={() => setVariable(variable)}>{variable.replace("_", " ")}</button>)}
            </div>
        </div>
    );
}

export default CorrelationGraph