import Leaderboard from "./Leaderboard";

const LeaderboardPage = ({ id }) => {
    return (
        <div id={id} style={{ display: "flex", alignItems: "center" }}>
            <div>
                <Leaderboard width={360} height={400} />
            </div>
            <div>
                <h2>2. Ranking over the years</h2>
                <p>
                    Check out leaderboard of top 10 countries over the years. 
                    <br/><br/>
                    Finland, Norway, Netherlands, Iceland, Switzerland, Sweden and Denmark successfully keep their place in top 10 happies countries over the years.
                    However, three places in top 10 still remain free and are occupied by different countries which change from one year to another.
                    <br/><br/>
                    Do you see Finland? If you observe closely you can see that Finland jumped from 5th place in 2017 to 1st place in 2018 and remained happiest country in the world for 6 years in a row! Is there a secret to their happiness?   
                </p>
            </div>
        </div>
    );
};

export default LeaderboardPage;