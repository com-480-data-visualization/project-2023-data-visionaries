import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import D3WorldMapVisualisation from "./D3WorldMapVisualisation";
import { years } from "../const";
import style from "./D3WorldMapVisualisation.module.css"


function WorldMapPageSecond() {
    const [year, setYear] = useState(Math.min(...years));

    return (
        <div className={style.mapContainer}>
            <D3WorldMapVisualisation year={year} width={"70%"} />
            <ProgressBar year={year} onYearChanged={(year) => setYear(year)} />
        </div>
    )
}

export default WorldMapPageSecond;

