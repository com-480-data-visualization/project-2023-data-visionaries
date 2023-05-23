import NetworkGraph from "./NetworkGraph";

const NetworkPage = ({ id }) => {
    return (
        <div id={id} style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
            <div>
                <h2>Network Graph</h2>
                <p>
                    Here is the network graph of all the countries connected with their neighbours. The larger node signifies happier country while the smaller ones correspond to less happy ones.
                    <br /><br />
                    You can compare country's happiness score in comparison with it's neighbours.
                    <br /><br />
                    Can you find Israel? It is 4th happiest country in 2023 and is surrounded by not so happy countries.
                </p>
            </div>
            <div style={{ border: "2px solid gray", borderRadius: "10px", height: "fit-content" }}>
                <NetworkGraph height={400} width={"100%"} />
            </div>
        </div>
    );
};

export default NetworkPage;