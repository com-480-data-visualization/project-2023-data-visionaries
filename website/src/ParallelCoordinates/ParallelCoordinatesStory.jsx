

const ParallelCoordinatesStory = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>

            <h2>Parallel coordinates</h2>
            <p>This is the visualization of all factors measured for each country. The graph shows trends and patterns of coutntries' scores. You can select specific ranges for one or multiple factors to see trends for countries that satisfy the constraints.</p>
            <p>Can money by happiness? Try selecting countries with highest GDP. It seems they are all ranked very high on happines score axis.</p>

        </div>
    )
}

export default ParallelCoordinatesStory;