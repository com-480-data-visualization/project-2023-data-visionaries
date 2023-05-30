import { useEffect, useRef, useState } from "react"
import style from "./CountryGraph.module.css"
import * as d3 from "d3";
import dataUrl from "../data/data_scores.csv?url"

const CountryGraph = (props) => {
    const countryCode = props.countryCode;
    const ref = useRef()
    const [data, setData] = useState(null);

    const margin = { top: 10, right: 30, bottom: 40, left: 60 };
    const width = 300 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;


    const preprocessData = (csv) => {
        const ret = {};
        for (let score of csv) {
            if (!ret[score.year]) ret[score.year] = {};
            ret[score.year][score.country_code] = { score: +score.happiness_score };
        }
        return ret;
    };

    useEffect(() => {
        d3.csv(dataUrl)
            .then((csv) => preprocessData(csv))
            .then((d) => setData(d))
            .catch((err) => console.log(err))
    }, []);

    function getCountryScoreData(countryCode) {
        let countryScores = []
        if (data == undefined) return countryScores
        for (let i = 2015; i <= 2023; i++) {
            if (data[i][countryCode]) {
                countryScores.push([i, data[i][countryCode]['score']])
            }
        }
        return countryScores;
    }



    useEffect(() => {
        if (data == null) return;
        const countryScoreData = getCountryScoreData(countryCode);
        var svg = d3.select(ref.current).html("")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .domain([2015, 2023])
            .nice()
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(6).tickFormat(function (d) { return parseInt(d); }));

        var formatAxis = d3.format("0");
        var y = d3.scaleLinear()
            .domain([0, 8])
            .nice()
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 35)
            .attr("x", -margin.top + 10)
            .style("font-size", "12px")
            .text("Happiness score")
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + margin.top + 25)
            .style("font-size", "12px")
            .text("Year");


        svg.append("path")
            .datum(countryScoreData)
            .attr("fill", "none")
            .attr("stroke", "purple")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d[0]) })
                .y(function (d) { return y(d[1]) })
            )
    }, [data, countryCode]);

    return (<>
        {
            data &&
            <div className={style.card}>
                <p>{props.title}</p>
                <div ref={ref} className={style.svgGraph} />
            </div>
        }
    </>)
}

export default CountryGraph