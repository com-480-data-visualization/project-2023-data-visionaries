import { useEffect, useRef, useState } from 'react';
import GEOJsonCountries from './custom.geo';
import style from "./D3WorldMapVisualisation.module.css";

import * as d3 from "d3";
import data from "./data";

const D3WorldMapVisualisation = ({ year, width, height }) => {
    const [hoveredCountry, setHoveredCountry] = useState("");
    const svgRef = useRef();
    const gRef = useRef();

    const getScore = (year, country) => {
        if (data[year][country]) {
            return data[year][country]["score"];
        }
        return undefined;
    }

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
        const gElement = d3.select(gRef.current);

        const projection = d3.geoMercator();
        const pathGenerator = d3.geoPath().projection(projection);

        const getColorByScore = d3
            .scaleLinear()
            .domain([3, 5, 6, 7, 8])
            .range(["red", "orange", "yellow", "green", "blue"]);

        const getFillColor = e => {
            const score = getScore(year, e.properties.name);
            if (score == undefined) return '#bbb';
            //return getColorByIndex(getIndex(year, e.properties.name));
            return getColorByScore(score);
        }

        gElement.selectAll('path').data(GEOJsonCountries.features)
            .enter()
            .append('path')
            .attr('d', pathGenerator);

        gElement.selectAll('path')
            .attr('fill', getFillColor)
            .attr('class', style.country)
            .attr('opacity', 1.0)
            .on('mouseover', (e, d) => {
                const countryName = d.properties.name;
                setHoveredCountry(countryName);
            })
            .on('mouseleave', d => {
                setHoveredCountry("")
            })

    }, [year]);

    return (
        <svg width={width} height={height} ref={svgRef}>
            <g ref={gRef} />
        </svg>
    );
}

export default D3WorldMapVisualisation;