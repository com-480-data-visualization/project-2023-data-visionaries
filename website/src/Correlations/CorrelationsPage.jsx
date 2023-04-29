import CorrelationGraph from "./CorrelationGraph";


const CorrelationsPage = ({id}) => {
    return (
        <div id={id}>
            <div>
                <h2>4. Correlations</h2>
                <p>
                    Are you wondering what are the factors that impact the happiness score of a countries? <br/><br/>Find out if there is a correlation between different variables and happines score.
                </p>
            </div>
            <div>
                <CorrelationGraph height={400} width={"100%"} />
            </div>
        </div>
    );
};

export default CorrelationsPage;