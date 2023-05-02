import { useEffect, useRef, useState } from 'react';
import style from "./D3WorldMapVisualisation.module.css";

import * as d3 from "d3";
import { useAtomValue } from 'jotai';
import { yearAtom } from '../state';
import { geoWinkel3 } from "https://cdn.skypack.dev/d3-geo-projection@4";
import topoJsonUrl from "../data/countries-110m.json?url";
import dataUrl from "../data/data_scores.csv?url";
import iso3166CodesUrl from "../data/iso3166_codes.json?url";
import * as tjson from "topojson-client";

const D3WorldMapVisualisation = ({ width, height }) => {
    const [scores, setScores] = useState(null);
    const [topoJson, setTopoJson] = useState(null);
    const [iso3166Codes, setIso3166Codes] = useState(null);
    const year = useAtomValue(yearAtom);
    const [hoveredCountry, setHoveredCountry] = useState("");

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

    const processIso3166Codes = (codes) => {
        const ret = {};
        for (let code of codes) {
            ret[code["country-code"]] = code["alpha-2"];
        }
        return ret;
    }

    const getScore = (year, country_code) => {
        return scores[year][country_code];
    }

    useEffect(() => {
        fetch(topoJsonUrl)
            .then(res => res.json())
            .then(tj => setTopoJson(tj))
            .catch(err => console.error("Error loading topoJson of countries.", err));
        fetch(iso3166CodesUrl)
            .then(res => res.json())
            .then(c => processIso3166Codes(c))
            .then(c => setIso3166Codes(c))
            .catch((err) => console.log("Error loading ISO-3166 codes", err));
        d3.csv(dataUrl)
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
        if (!scores || !topoJson || !iso3166Codes) return;
        const gElement = d3.select(gRef.current);

        const projection = geoWinkel3();
        const pathGenerator = d3.geoPath().projection(projection);

        const colorByScore = d3
            .scaleLinear()
            .domain([3, 5, 6, 7, 8])
            .range(["red", "orange", "yellow", "green", "blue"]);

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
            .attr('fill', getFillColor);

    }, [year, scores, topoJson, iso3166Codes]);

    return (
        <svg width={width} height={height} ref={svgRef} viewBox='0 0 400 200'>
            <g ref={gRef} />
        </svg>
    );
}

export default D3WorldMapVisualisation;