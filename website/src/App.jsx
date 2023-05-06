import CorrelationsPage from "./Correlations/CorrelationsPage";
import WorldMapPage from "./D3WorldMapVisualisation/WorldMapPage";
import NetworkPage from "./NetworkGraph/NetworkPage";
import Header from "./Header";
import IntroductionPage from "./Introduction/IntroductionPage";
import LeaderboardPage from "./Leaderboard/LeaderboardPage";
import style from "./Styles.module.css";
import ParallelCoordinatesPage from "./ParallelCoordinates/ParallelCoordinatesPage";

function App() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000, margin: "0 auto" }}>
        <IntroductionPage id="introduction" />
        <LeaderboardPage id="leaderboard" />
        <WorldMapPage id="map" />
        <CorrelationsPage id="correlation" />
        <NetworkPage id="network" />
        <ParallelCoordinatesPage />
      </div>
    </>
  );
}

export default App
