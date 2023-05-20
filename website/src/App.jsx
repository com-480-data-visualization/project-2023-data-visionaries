import CorrelationsPage from "./Correlations/CorrelationsPage";
import WorldMapPage from "./D3WorldMapVisualisation/WorldMapPage";
import NetworkPage from "./NetworkGraph/NetworkPage";
import Header from "./Header";
import IntroductionPage from "./Introduction/IntroductionPage";
import LeaderboardPage from "./Leaderboard/LeaderboardPage";
import style from "./Styles.module.css";
import ParallelCoordinatesPage from "./ParallelCoordinates/ParallelCoordinatesPage";
import ReactFullpage from "@fullpage/react-fullpage";
import D3WorldMapVisualisation from "./D3WorldMapVisualisation/D3WorldMapVisualisation";
import ProgressBar from "./ProgressBar/ProgressBar";
import WorldMapPageSecond from "./D3WorldMapVisualisation/WorldMapPageSecond";

function App() {
  const anchors = ['1', '2', '3', '4', '5', '6', '7']
  return (
    <ReactFullpage
      anchors={anchors}
      navigation
      navigat
      sectionsColor={["#571F4E", "#EEE", "#EEE", "#EEE", "#EEE", "#EEE", "#EEE"]}
      onLeave={(origin, destination, direction) => {
        console.log("onLeave event", { origin, destination, direction });
      }}
      render={({ state, fullpageApi }) => {
        console.log("render prop change", state, fullpageApi);

        return (
          <div>
            <div className="section"><IntroductionPage id="introduction" /></div>
            <div className="section"><LeaderboardPage id="leaderboard" /></div>
            <div className="section"><WorldMapPage id="map" /></div>
            <div className="section"><WorldMapPageSecond /></div>
            <div className="section"><CorrelationsPage id="correlation" /></div>
            <div className="section"><NetworkPage id="network" /></div>
            <div className="section"><ParallelCoordinatesPage id="parallel" /></div>
          </div>
        );
      }}
    />
  );
}

export default App
