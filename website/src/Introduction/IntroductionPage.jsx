import style from "./Introduction.module.css"

const IntroductionPage = () => {
    return (
        <div className={style.introduction}>
            <h2>World Happiness Report</h2>
            <div>
                <p className={style.text}>Welcome to our World Happiness Visualization.</p>
                <br />
                <p className={style.text}>In this project, we created different visualizations for data from the “World Happiness Report”, publication that measures the subjective well-being of individuals across countries and regions. The data contains happiness score for world countries and the following additional measures: GDP per capita, healthy life expectancy, social support, freedom to make life choices, generosity and corruption. </p>


                <div className={style.text}>
                    <br /><br />Here you can:
                    <ul>
                        <li>explore happiness levels all over the world</li>
                        <li>find out which countries are the happiest</li>
                        <li>compare the countries to their neighbours</li>
                        <li>see how happiness changes over the time</li>
                        <li>find out which factors contribute to countries' happiness</li>
                        <li>find out if there is a secret to being happy</li>
                    </ul>
                </div>
                <br />
                <p className={style.text}>Enjoy exploring our visualizations.</p>
            </div>
        </div>
    );
};

export default IntroductionPage;