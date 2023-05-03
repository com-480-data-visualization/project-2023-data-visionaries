import style from "./Header.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProgressController from "./ProgressBar/ProgressController";

const Header = () => {
    return (
        <div className={style.header}>
            <a href="#introduction"><p>Introduction</p></a>
            <a href="#leaderboard"><p>Ranking over the years</p></a>
            <a href="#map"><p>Mapping Happiness</p></a>
            <a href="#correlation"><p>Correlations</p></a>
            <a href="#network"><p>Network graph</p></a>
            <div style={{display: "flex"}}>
                <ProgressController />
                <ProgressBar />
            </div>
        </div>
    )
}

export default Header;