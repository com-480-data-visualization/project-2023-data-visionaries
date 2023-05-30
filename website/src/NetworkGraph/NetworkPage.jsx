import { useState } from "react";
import NetworkGraph from "./NetworkGraph";
import style from "./NetworkGraph.module.css";
import * as d3 from "d3"

const NetworkPage = () => {

    const [variable, setVariable] = useState("happiness")
    const colors = {
        "happiness": d3.interpolateInferno(6 / 7),
        "gdp": d3.interpolateInferno(5 / 7),
        "social_support": d3.interpolateInferno(4 / 7),
        "life_expectancy": d3.interpolateInferno(3 / 7),
        "freedom": d3.interpolateInferno(2 / 7),
        "generosity": d3.interpolateInferno(1 / 7),
        "corruption": d3.interpolateInferno(0 / 7),
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center", alignItems: "stretch" }}>

            <div style={{ border: "2px solid gray", borderRadius: "10px" }}>
                <NetworkGraph variable={variable} />
            </div>
            <div className={style.buttonsContainer}>
                {Object.keys(colors).map(key => <button key={key} style={{ color: "white" }} className={`${style.button} ${variable == key ? style.buttonActive : ""}`} onClick={() => setVariable(key)}>{key.replace("_", " ")}</button>)}
            </div>
        </div>
    );
};

export default NetworkPage;