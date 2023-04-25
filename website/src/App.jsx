import { useState } from "react";
import CountryGraph from "./CountryGraph/CountryGraph";
import Leaderboard from "./Leaderboard/Leaderboard";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProgressController from "./ProgressBar/ProgressController";
import style from "./index.module.css"
import CorrelationGraph from "./Correlations/CorrelationGraph";
import D3WorldMapVisualisation from "./D3WorldMapVisualisation/D3WorldMapVisualisation";
import GraphVisualization from "./GraphVisualization/GraphVisualization";
import { useAtomValue } from "jotai";
import { yearAtom } from "./state";

function App() {
  const year = useAtomValue(yearAtom);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={style.progressContainer}>
        <ProgressBar />
        <ProgressController />
      </div>
      <div style={{ display: "flex" }}>
        <D3WorldMapVisualisation year={year} width={400} height={400} />
        <Leaderboard width={400} height={400} />
      </div>
      <div style={{ display: "flex" }}>
        <CountryGraph name={"France"} />
        <CountryGraph name={"Slovenia"} />
        <CountryGraph name={"Netherlands"} />
        <CountryGraph name={"Finland"} />
      </div>

      <CorrelationGraph />
	  <GraphVisualization />
    </div>
  );
}

export default App
