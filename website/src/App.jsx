import CorrelationsPage from "./Correlations/CorrelationsPage";
import WorldMapPage from "./D3WorldMapVisualisation/WorldMapPage";
import NetworkPage from "./NetworkGraph/NetworkPage";
import IntroductionPage from "./Introduction/IntroductionPage";
import LeaderboardPage from "./Leaderboard/LeaderboardPage";
import style from "./Styles.module.css";
import ParallelCoordinatesPage from "./ParallelCoordinates/ParallelCoordinatesPage";
import WorldMapPageSecond from "./D3WorldMapVisualisation/WorldMapPageSecond";
import FinlandPage from "./Finland/FinlandPage";


function App() {
  return (
    <div className={style.container}>
      <div className={style.section}><IntroductionPage /></div>
      <div className={style.section}><LeaderboardPage /></div>
      <div className={style.section}><WorldMapPage /></div>
      <div className={style.section}><WorldMapPageSecond /></div>
      <div className={style.section}><CorrelationsPage /></div>
      <div className={style.section}><NetworkPage /></div>
      <div className={style.section}><ParallelCoordinatesPage /></div>
      <div className={style.section}><FinlandPage /></div>
    </div>
  );
}

export default App
