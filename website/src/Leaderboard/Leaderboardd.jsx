import { useRef, useEffect, useState } from "react";
import style from "./Leaderboard.module.css";
import * as d3 from "d3";


const Leaderboard = () => {
    const [data, setData] = useState({})
    const [year, setYear] = useState("2015")
    const ref = useRef();
    const [countries, setCountries] = useState([])

    const divHeight = 30;

    useEffect(() => {
        d3.json('/data.json').then((data_json) => {
            console.log(data_json)
            setData(data_json)
            const margin = { top: 30, right: 80, bottom: 10, left: 80 },
                width = 800 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom
            const svgElement = d3.select(ref.current).html("")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
            console.log(data)

            
        }).catch((err) => {
            console.error("Error loading data", err);
        })

    }, [])

    useEffect(() => {
        console.log(year)
        console.log(data[year])
        if (Object.keys(data).length !== 0) {
            const newCountries = Object.keys(data[year]).sort((a, b) => data[year][b] - data[year][a])
            setCountries(newCountries.slice(0, 10))
        }
        d3.select(ref.current)
                .selectAll('div')
                .data(countries)
                .enter()
                .append("div")
                .text(function(d) {
                    return d
                })
                .style("border", "2px solid black")
                .style("position", "absolute")
                .style("background", "red")
                .attr('class', 'leaderboardItem')
                .style("width", c => c["score"] * 10 + "px")


    }, [year]);

    function nextYear() {
        const newYear = Math.min(parseInt(year) + 1, 2022)
        setYear(String(newYear))
    }

    function previousYear() {
        const newYear = Math.max(year - 1, 2015)
        setYear(String(newYear))
    }

    return (
        <>
            <button onClick={previousYear}>Previous year</button>
            <button onClick={nextYear}>Next year</button>
            <div className={style.leaderboard}>
                <svg ref={ref} />
            </div>
        </>
    );
}

export default Leaderboard;