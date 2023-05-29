import { useState } from "react";
import NetworkGraph from "./NetworkGraph";
import style from "./NetworkGraph.module.css";

const NetworkPage = ({ id }) => {

    const [variable, setVariable] = useState("happiness")
    const colors = {
        "happiness": "#F8AD1A",
        "gdp": "#F8AD1A",
        "social_support": "#F6810C",
        "life_expectancy": "#E34D20",
        "freedom": "#AA2243",
        "generosity": "#6C0D59",
        "corruption": "#3F0059"
    }
    return (
        <div id={id} style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center", alignItems: "stretch" }}>

            <div style={{ border: "2px solid gray", borderRadius: "10px", height: "fit-content" }}>
                <NetworkGraph variable={variable} width={"100%"} />
            </div>
            <div className={style.buttonsContainer}>
                {Object.keys(colors).map(key => <button key={key} style={{ backgroundColor: `${colors[key]}`, color: "white" }} className={style.button} onClick={() => setVariable(key)}>{key.replace("_", " ")}</button>)}
            </div>
        </div>
    );
};

export default NetworkPage;