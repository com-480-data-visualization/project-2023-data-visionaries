import style from "./Finland.module.css"

const FinlandPage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
            <div>
                <h2>What is the secret of happiness?</h2>
                <p>
                    Finland has been the world's happiest country for the past 6 years. Is there a secret to their happiness?
                    <br /><br />
                    Here are some interesting facts about Finland:
                </p>
                <div className={style.factsContainer}>
                    <div className={style.fact}>Finland is the <b style={{ color: "#6C0D59", fontSize: "22px" }}>world's biggest consumer of coffee</b> on a per-person basis. Fins, on average, drink <b style={{ color: "#6C0D59", fontSize: "22px" }}>4 cups</b> of coffee per day, which is around <b style={{ color: "#6C0D59", fontSize: "22px" }}>12 kilograms</b> of coffie per year! Moreover, two 10 minute coffee breaks a day are mandatory by law for Finns workers.</div>
                    <div className={style.fact}>Finland is the <b style={{ color: "#E34D20", fontSize: "22px" }}>most forested country in Europe</b> with more than <b style={{ color: "#E34D20", fontSize: "22px" }}>75%</b> of its land area covered with forest. </div>
                    <div className={style.fact}>Finland ranks <b style={{ color: "#AA2243", fontSize: "22px" }}>3<sup>rd</sup></b> in the Education Ranking by Countries in 2021. Finland has the highest rate of high school completion in the world. According to the World Economic Forum’s Global Competitiveness Report, Finland has the <b style={{ color: "#AA2243", fontSize: "22px" }}>best-developed education system</b> in the world. </div>

                </div>
            </div>

        </div>
    );
};

export default FinlandPage;