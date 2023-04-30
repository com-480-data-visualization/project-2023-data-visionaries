import D3WorldMapVisualisation from "./D3WorldMapVisualisation";

const WorldMapPage = ({ id }) => {
    return (
        <div id={id}>
            <h2>3. Mapping Happiness</h2>
            <p>
                Take a look at the happiness scores on map. Zoom in secific region and check out how scores change over the time.
                <br/><br/>
                You can see that countries in east Europe as well as Portugal became happier over the years while west Europe remained more or less the same.
                <br/><br/>
                Both North and majority of South America are becomming happier. Unfortunatelly, it can be seen that Africa doesn't follow their trend.
            
            </p>
            <D3WorldMapVisualisation height={600} width={"100%"} />
        </div>
    );
};

export default WorldMapPage;