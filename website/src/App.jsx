import CorrelationsPage from "./Correlations/CorrelationsPage";
import WorldMapPage from "./D3WorldMapVisualisation/WorldMapPage";
import GraphPage from "./GraphVisualization/GraphPage";
import Header from "./Header";
import IntroductionPage from "./Introduction/IntroductionPage";
import LeaderboardPage from "./Leaderboard/LeaderboardPage";
import style from "./Styles.module.css";

function App() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000, margin: "0 auto" }}>
        <IntroductionPage id="introduction" />
        <LeaderboardPage id="leaderboard" />
        <WorldMapPage id="map" />
        <CorrelationsPage id="correlation" />
        <GraphPage id="graph" />
      </div>
    </>
  );
}

export default App
