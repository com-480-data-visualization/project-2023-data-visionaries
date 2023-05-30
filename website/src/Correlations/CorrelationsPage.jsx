import CorrelationGraph from "./CorrelationGraph";


const CorrelationsPage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
            <div>
                <h2>Correlations</h2>
                <p>
                    Are you wondering what are the factors that impact the happiness score of a countries? <br />Find out if there is a correlation between different variables and happines score.
                </p>
            </div>
            <div>
                <CorrelationGraph width={"40%"} />
            </div>
        </div>
    );
};

export default CorrelationsPage;