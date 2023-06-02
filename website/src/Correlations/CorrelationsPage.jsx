import CorrelationGraph from "./CorrelationGraph";


const CorrelationsPage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
            <div>
                <h2>Correlations</h2>
                <p>Happiness score is subjective well-being of individuals in one country. The score is measured using survey released by the Gallup World Poll (GWP). The final score is the national average response to the question of life evaluations. The question asked in the survey is: "Please imagine a ladder, with steps numbered from 0 at the bottom to 10 at the top. The top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you. On which step of the ladder would you say you personally feel you stand at this time?" </p>
                <p>Are you wondering what are the factors that impact the happiness score of a country? <br /> Find out if there is correlation between different variables and happines score.</p>
            </div>
            <div>
                <CorrelationGraph width={"40%"} />
            </div>
        </div>
    );
};

export default CorrelationsPage;