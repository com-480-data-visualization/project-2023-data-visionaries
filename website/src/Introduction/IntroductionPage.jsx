import style from "./Introduction.module.css"

const IntroductionPage = ({ id }) => {
    return (
        <div id={id} className={style.introduction}>
            <h2>World happiness report</h2>
            <div>
                <p className={style.text}>Welcome to our World Happiness Visualization.</p>
                <br /><br />Here you can:
                <ul>
                    <li>explore happiness levels all over the world</li>
                    <li>find out which countries are the happiest</li>
                    <li>compare the countries to their neighbours</li>
                    <li>see how happiness changes over the time</li>
                    <li>find out which factors contribute to countries' happiness</li>
                    <li>find out is there a secret to being happy</li>
                </ul>
            </div>
        </div>
    );
};

export default IntroductionPage;