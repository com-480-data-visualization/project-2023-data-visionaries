import { useEffect, useRef, useState } from "react"
import style from "./CountryGraph.module.css"
import * as d3 from "d3";
import dataUrl from "../data/data_scores.csv?url"

const CountryGraph = (props) => {
    const countryName = props.name
    const ref = useRef()
    const [data, setData] = useState(null)

    const margin = { top: 10, right: 30, bottom: 30, left: 60 }
    const width = 300 - margin.left - margin.right
    const height = 200 - margin.top - margin.bottom;


    const preprocessData = (csv) => {
        const ret = {};
        for (let score of csv) {
            if (!ret[score.year]) ret[score.year] = {};
            ret[score.year][score.country] = { score: +score.happiness_score };
        }
        return ret;
    };

    useEffect(() => {
        d3.csv(dataUrl)
            .then((csv) => preprocessData(csv))
            .then((json) => setData(json))
            .catch((err) => console.log(err))
    }, []);

    function getCountryScoreData(countryName) {
        let countryScores = []
        if (data == undefined) return countryScores
        for (let i = 2015; i <= 2022; i++) {
            if (data[i][countryName] !== null) {
                countryScores.push([i, data[i][countryName]['score']])
            }
        }
        return countryScores
    }

    const countryScoreData = getCountryScoreData(countryName);

    const domain_upper = Math.max(...countryScoreData.map(el => el[1])) + 0.1
    const domain_lower = Math.min(...countryScoreData.map(el => el[1])) - 0.1

    useEffect(() => {
        var svg = d3.select(ref.current).html("")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .domain([2015, 2022])
            .nice()
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(6).tickFormat(function (d) { return parseInt(d); }));

        var formatAxis = d3.format("0");
        var y = d3.scaleLinear()
            .domain([domain_lower, domain_upper])
            .nice()
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(countryScoreData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d[0]) })
                .y(function (d) { return y(d[1]) })
            )
    }, [data])

    return (
        <div className={style.card}>
            <p className={style.countryName}>{countryName}</p>
            <div ref={ref} className={style.svgGraph}>

            </div>
        </div>
    )
}

export default CountryGraph