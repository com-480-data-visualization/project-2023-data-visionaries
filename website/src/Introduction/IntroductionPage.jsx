const IntroductionPage = ({ id }) => {
    return (
        <div id={id}>
            <h2>1. Introduction</h2>
            <p>
                Welcome to our World Happiness Visualization.
                <br /><br />Here you can:
                <ul>
                    <li>explore happiness levels all over the world</li>
                    <li>find out which countries are the happiest</li>
                    <li>compare the countries to their neighbours</li>
                    <li>see how happiness changes over the time</li>
                    <li>find out which factors contribute to countries' happiness</li>
                    <li>find out is there a secret to being happy</li>
                </ul>
            </p>
        </div>
    );
};

export default IntroductionPage;