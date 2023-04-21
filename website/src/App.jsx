import { useState } from "react";
import CountryGraph from "./CountryGraph/CountryGraph";
import Leaderboard from "./Leaderboard/Leaderboard";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProgressController from "./ProgressBar/ProgressController";
import style from "./index.module.css"
import CorrelationGraph from "./Correlations/CorrelationGraph";

function App() {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={style.progressContainer}>
        <ProgressBar />
        <ProgressController />
      </div>
      <Leaderboard width={400} height={400} />
      <div style={{display:"flex"}}>
        
        <CountryGraph name={"France"} />
        <CountryGraph name={"Slovenia"} />
        <CountryGraph name={"Netherlands"} />
        <CountryGraph name={"Finland"} />
      </div>

      <CorrelationGraph />

    </div>
  );
}

export default App
