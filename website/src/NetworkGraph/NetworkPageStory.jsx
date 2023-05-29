

const NetworkPageStory = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>

            <h2>Network Graph</h2>
            <p>
                Here is the network graph of all the countries connected with their neighbours. A larger flag signifies a higher value for the selected variable.
                <br /><br />
                The link between two neighbouring countries's thickness and color indicates the difference in happiness between the two of them. A color gradient indicating the difference is available in the bottom right corner of the graph.
                <br /><br />
                You can compare country's happiness score in comparison with it's neighbours.
                <br /><br />
                Can you find Israel? It is 4th happiest country in 2023 and is surrounded by not so happy countries.
            </p>
        </div>
    )
}

export default NetworkPageStory;