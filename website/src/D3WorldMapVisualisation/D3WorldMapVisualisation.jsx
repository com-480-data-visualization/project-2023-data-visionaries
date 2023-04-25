import { useEffect, useRef, useState } from 'react';
import style from "./D3WorldMapVisualisation.module.css";

import * as d3 from "d3";

const D3WorldMapVisualisation = ({ year, width, height }) => {
    const [hoveredCountry, setHoveredCountry] = useState("");
    const [scores, setScores] = useState(null);
    const [geoJson, setGeoJson] = useState(null);
    const svgRef = useRef();
    const gRef = useRef();

    const processScores = (scores) => {
        const ret = {};
        for (let score of scores) {
            if (!ret[score.year]) ret[score.year] = {};
            ret[score.year][score.country_code] = +score.happiness_score;
        }
        return ret;
    }

    const getScore = (year, country_code) => {
        return scores[year][country_code];
    }

    useEffect(() => {
        fetch("/custom.geo.json")
            .then(res => res.json())
            .then(gj => setGeoJson(gj))
            .catch(err => console.error("Error loading geoJson of countries."));
        d3.csv("/data_scores.csv")
            .then(scores => processScores(scores))
            .then(scores => setScores(scores))
            .catch(err => console.error("Error loading scores."));
    }, []);

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);
        const gElement = d3.select(gRef.current);
        const handleZoom = (e) => gElement.attr('transform', e.transform);

        const zoom = d3.zoom()
            .scaleExtent([1, 6])
            .translateExtent([[0, -200], [1000, 450]])
            .on('zoom', handleZoom)

        svgElement
            .call(zoom)
            .call(zoom.transform, d3.zoomIdentity.translate(-300, 100).scale(1));
    }, []);

    useEffect(() => {
        if (!scores || !geoJson) return;
        const gElement = d3.select(gRef.current);

        const projection = d3.geoMercator();
        const pathGenerator = d3.geoPath().projection(projection);

        const getColorByScore = d3
            .scaleLinear()
            .domain([3, 5, 6, 7, 8])
            .range(["red", "orange", "yellow", "green", "blue"]);

        const getFillColor = e => {
            const score = getScore(year, e.properties.iso_a2_eh);
            if (score == undefined) return '#bbb';
            //return getColorByIndex(getIndex(year, e.properties.name));
            return getColorByScore(score);
        }

        gElement.selectAll('path').data(geoJson.features)
            .enter()
            .append('path')
            .attr('d', pathGenerator);

        gElement.selectAll('path')
            .attr('fill', getFillColor)
            .attr('class', style.country)
            .attr('opacity', 1.0)
            .on('mouseover', (e, d) => {
                const countryName = d.properties.iso_a2_eh;
                setHoveredCountry(countryName);
            })
            .on('mouseleave', d => {
                setHoveredCountry("")
            })

    }, [year, scores, geoJson]);

    return (
        <svg width={width} height={height} ref={svgRef}>
            <g ref={gRef} />
        </svg>
    );
}

export default D3WorldMapVisualisation;