const WorldMapPage = () => {


    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
            <h2>Mapping Happiness</h2>
            <p>
                Take a look at the happiness scores on map. Zoom in secific region and check out how scores change over the time.
                <br />
                You can see that countries in east Europe as well as Portugal became happier over the years while west Europe remained more or less the same.
                <br /><br />
                Both North and majority of South America are becomming happier. Unfortunatelly, it can be seen that Africa doesn't follow their trend.
            </p>

        </div>
    );
};

export default WorldMapPage;