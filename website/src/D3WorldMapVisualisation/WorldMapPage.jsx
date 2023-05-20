import ProgressController from "../ProgressBar/ProgressController";
import ProgressBar from "../ProgressBar/ProgressBar";
import { years } from "../const";
import D3WorldMapVisualisation from "./D3WorldMapVisualisation";
import { useState } from "react";

const WorldMapPage = ({ id }) => {
    const [year, setYear] = useState(Math.min(...years));

    return (
        <div id={id}>
            <h2>3. Mapping Happiness</h2>
            <p>
                Take a look at the happiness scores on map. Zoom in secific region and check out how scores change over the time.
                <br /><br />
                You can see that countries in east Europe as well as Portugal became happier over the years while west Europe remained more or less the same.
                <br /><br />
                Both North and majority of South America are becomming happier. Unfortunatelly, it can be seen that Africa doesn't follow their trend.

            </p>
            <D3WorldMapVisualisation year={year} width={"100%"} />
            <ProgressBar year={year} onYearChanged={(year) => setYear(year)} />
        </div>
    );
};

export default WorldMapPage;