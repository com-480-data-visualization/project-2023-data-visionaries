import Leaderboard from "./Leaderboard";
import ProgressBar from "../ProgressBar/ProgressBar";
import { years } from "../const";
import { useState } from "react";
import style from "./Leaderboard.module.css"

const LeaderboardPage = () => {
    const [year, setYear] = useState(Math.min(...years));

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
            <h2>Ranking over the years</h2>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div >
                    <Leaderboard year={year} width={360} height={400} />
                    <ProgressBar year={year} onYearChanged={(year) => setYear(year)} />
                </div>
                <p className={style.halfDiv}>
                    Check out the leaderboard of top 10 countries over the years.
                    <br /><br />
                    Finland, Norway, Netherlands, Iceland, Switzerland, Sweden and Denmark successfully keep their place in top 10 happiest countries over the years.
                    However, three places in top 10 still remain free and are occupied by different countries which change from one year to another.
                    <br /><br />
                    Do you see Finland? If you observe closely you can see that Finland jumped from 5th place in 2017 to 1st place in 2018 and remained the happiest country in the world for 6 years in a row! Is there a secret to their happiness? Find out below.
                </p>
            </div>
        </div>
    );
};

export default LeaderboardPage;