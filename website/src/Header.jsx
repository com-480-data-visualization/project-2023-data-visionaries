import style from "./Header.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";

const Header = () => {
    return (
        <div className={style.header}>
            <a href="#introduction"><p>Introduction</p></a>
            <a href="#leaderboard"><p>Ranking over the years</p></a>
            <a href="#map"><p>Mapping Happiness</p></a>
            <a href="#correlation"><p>Correlations</p></a>
            <a href="#graph"><p>Graph visualisation</p></a>
            <ProgressBar></ProgressBar>
        </div>
    )
}

export default Header;