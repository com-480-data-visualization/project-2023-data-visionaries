import CorrelationsPage from "./Correlations/CorrelationsPage";
import WorldMapPage from "./D3WorldMapVisualisation/WorldMapPage";
import GraphPage from "./GraphVisualization/GraphPage";
import IntroductionPage from "./Introduction/IntroductionPage";
import LeaderboardPage from "./Leaderboard/LeaderboardPage";
import style from "./Styles.module.css";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000, margin: "0 auto" }}>
      <IntroductionPage />
      <LeaderboardPage />
      <WorldMapPage />
      <CorrelationsPage />
      <GraphPage />
    </div>
  );
}

export default App
