import { useEffect, useRef, useState } from 'react';
import style from "./D3WorldMapVisualisation.module.css";

import * as d3 from "d3";
import { geoWinkel3 } from "https://cdn.skypack.dev/d3-geo-projection@4";
import topoJsonUrl from "../data/countries-110m.json?url";
import dataUrl from "../data/data_scores.csv?url";
import iso3166CodesUrl from "../data/iso3166_codes.json?url";
import * as tjson from "topojson-client";
import CountryGraph from '../CountryGraph/CountryGraph';

const D3WorldMapVisualisation = ({ width, year }) => {
    const [scores, setScores] = useState(null);
    const [topoJson, setTopoJson] = useState(null);
    const [iso3166Codes, setIso3166Codes] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState("");
    const hoverRef = useRef();
    const svgRef = useRef();
    const gRef = useRef();
    const gLegendRef = useRef();

    const processScores = (scores) => {
        const ret = {};
        for (let score of scores) {
            if (!ret[score.year]) ret[score.year] = {};
            ret[score.year][score.country_code] = { happiness_score: +score.happiness_score, country: score.country };
        }
        return ret;
    }

    const processIso3166Codes = (codes) => {
        const ret = {};
        for (let code of codes) {
            ret[code["country-code"]] = code["alpha-2"];
        }
        return ret;
    }

    const getScore = (year, country_code) => {
        if (scores[year] && scores[year][country_code])
            return scores[year][country_code].happiness_score;
    }

    const colorByScore = d3.scaleSequential().domain([8, 3]).nice().interpolator(d3.interpolateInferno);

    //d3.scaleLinear().domain([3, 5, 6, 7, 8]).range(["red", "orange", "yellow", "green", "blue"]);

    useEffect(() => {
        fetch(topoJsonUrl)
            .then(res => res.json())
            .then(tj => setTopoJson(tj))
            .catch(err => console.error("Error loading topoJson of countries.", err));
        fetch(iso3166CodesUrl)
            .then(res => res.json())
            .then(c => processIso3166Codes(c))
            .then(c => setIso3166Codes(c))
            .catch((err) => console.error("Error loading ISO-3166 codes", err));
        d3.csv(dataUrl)
            .then(scores => processScores(scores))
            .then(scores => setScores(scores))
            .catch(err => console.error("Error loading scores.", err));
    }, []);

    if (scores) console.log(hoveredCountry, scores[year][hoveredCountry])

    useEffect(() => {
        const width = 400, height = 200;
        const legendDims = {
            width: 120,
            height: 6,
            margin: {
                h: 6,
                v: 8
            }
        };
        const svgElement = d3.select(svgRef.current);
        const gElement = d3.select(gRef.current);
        const legendElement = d3.select(gLegendRef.current);
        const handleZoom = (e) => gElement.attr('transform', e.transform);

        const zoom = d3.zoom()
            .translateExtent([[75, 0], [900, 420]])
            .scaleExtent([0.55, 3.3])
            .on('zoom', handleZoom);

        svgElement
            .attr("viewBox", `0 0 ${width} ${height}`)
            .call(zoom)
            .call(zoom.transform, d3.zoomIdentity.translate(-85, -20).scale(0.55));

        legendElement.html("");
        const linearGradient = legendElement
            .append("linearGradient")
            .attr("id", "map-gradient");

        linearGradient
            .selectAll("stop")
            .data(colorByScore.ticks().map((t, i, n) => ({ offset: `${100 * i / (n.length - 1)}%`, color: colorByScore(t) })))
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
            .domain([colorByScore.domain()[0], colorByScore.domain()[colorByScore.domain().length - 1]])
            .range([width - legendDims.width - legendDims.margin.h, width - legendDims.margin.h - 1])
        const axisBottom = g => g
            .attr("transform", `translate(0, ${height - legendDims.height - legendDims.margin.v})`)
            .style("font-size", "8px")
            .call(d3.axisBottom(axisScale)
                .ticks(legendDims.width / 30)
                .tickSize(2 * legendDims.height / 3))

        legendElement.append('g').call(axisBottom);

    }, []);

    useEffect(() => {
        if (!scores || !topoJson || !iso3166Codes) return;
        const gElement = d3.select(gRef.current);

        const projection = geoWinkel3();
        const pathGenerator = d3.geoPath().projection(projection);

        const getFillColor = e => {
            const score = getScore(year, iso3166Codes[e.id]);
            if (score == undefined) return '#bbb';
            return colorByScore(score);
        }

        const countries = gElement
            .selectAll('path')
            .data(tjson.feature(topoJson, topoJson.objects.countries).features);

        const countriesEnter = countries
            .enter()
            .append('path')
            .attr('d', pathGenerator);

        countriesEnter
            .merge(countries)
            .attr('class', style.country)
            .attr('fill', getFillColor)
            .on("mouseenter", (d, f) => setHoveredCountry(iso3166Codes[f.id]))
            .on("mouseleave", () => setHoveredCountry(""))
            .on("mousemove", (d, f) => {
                d3
                    .select(hoverRef.current)
                    .style("top", `${d.clientY + 4}px`)
                    .style("left", `${d.clientX + 4}px`);
            });

    }, [year, scores, topoJson, iso3166Codes]);

    return (
        <>
            <div ref={hoverRef} style={{ position: "absolute", visibility: "visible" }}>
                {
                    scores
                    && scores[year]
                    && scores[year][hoveredCountry]
                    && <CountryGraph countryCode={hoveredCountry} title={`${scores[year][hoveredCountry].country} (${scores[year][hoveredCountry].happiness_score.toFixed(2)} in ${year})`} />
                }
            </div>
            <svg width={width} ref={svgRef} style={{ border: "1px solid grey", borderRadius: "12px" }}>
                <g ref={gRef} />
                <g ref={gLegendRef} />
            </svg>
        </>
    );
}

export default D3WorldMapVisualisation;