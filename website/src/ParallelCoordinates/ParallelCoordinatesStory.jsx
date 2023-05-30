

const ParallelCoordinatesStory = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>

            <h2>Parallel coordinates</h2>
            On graph with multiple coordinates we visualize factors measured for each country. The graph shows trends and patterns of coutntries' scores. You can select specific ranges for one or multiple factors to see trends for countries that satisfy the constraints. Hover over the line to  find out which country it represents.
            <br /><br />
            You can drag the selected range over the axis. To remove the selected range, click again on the axis containing the constraint.
            <br /><br />
            Can money by happiness? Try selecting countries with highest GDP. It seems they are all ranked very high on happines score axis.

        </div>
    )
}

export default ParallelCoordinatesStory;