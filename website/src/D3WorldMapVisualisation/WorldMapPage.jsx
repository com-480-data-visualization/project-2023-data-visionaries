const WorldMapPage = () => {


    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
            <h2>Mapping Happiness</h2>
            <p>
                Take a look at the happiness scores on map. Zoom in secific region and check out how scores change over the time. Hover over the coutry to get graph of happiness change.
                <br /><br />
                You can see that countries in east Europe as well as Portugal became happier over the years while west Europe remained more or less the same.
                <br /><br />
                Australia keeps it happiness score steadily at above 7. However, countries in North and majority of South America are becomming unhappier. It can be seen that Africa also follows that trend.
                <br /><br />
                Explore the visualization and find out which coutries changed the most.
            </p>

        </div>
    );
};

export default WorldMapPage;