import { useEffect, useRef, useState } from 'react';
import style from "./D3WorldMapVisualisation.module.css";

import * as d3 from "d3";
import { useAtomValue } from 'jotai';
import { yearAtom } from '../state';
import { geoWinkel3 } from "https://cdn.skypack.dev/d3-geo-projection@4";

const D3WorldMapVisualisation = ({ width, height }) => {
    const year = useAtomValue(yearAtom);
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
            .catch(err => console.error("Error loading geoJson of countries.", err));
        d3.csv("/data_scores.csv")
            .then(scores => processScores(scores))
            .then(scores => setScores(scores))
            .catch(err => console.error("Error loading scores.", err));
    }, []);

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);
        const gElement = d3.select(gRef.current);
        const handleZoom = (e) => gElement.attr('transform', e.transform);

        const zoom = d3.zoom()
            .translateExtent([[75, 40], [900, 400]])
            .scaleExtent([0.55, 3.3])
            .on('zoom', handleZoom);

        svgElement
            .call(zoom)
            .call(zoom.transform, d3.zoomIdentity.translate(-85, -20).scale(0.55));
    }, []);

    useEffect(() => {
        if (!scores || !geoJson) return;
        const gElement = d3.select(gRef.current);

        const projection = geoWinkel3();
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
        <svg width={width} height={height} ref={svgRef} viewBox='0 0 400 200'>
            <g ref={gRef} />
        </svg>
    );
}

export default D3WorldMapVisualisation;