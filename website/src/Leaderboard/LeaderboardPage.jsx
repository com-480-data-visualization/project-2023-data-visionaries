import Leaderboard from "./Leaderboard";

const LeaderboardPage = () => {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <div>
                <Leaderboard width={360} height={400} />
            </div>
            <div>
                <h2>2. Ranking over the years</h2>
                <p>
                    Suspendisse sit amet nisi eu orci commodo condimentum. Aenean tincidunt facilisis tempus. Cras quis tempus magna. Aliquam et viverra diam. Cras ante massa, aliquam et dignissim in, aliquam eget elit. Praesent a urna justo. Nunc vulputate felis orci, eget consequat purus imperdiet nec.
                    Mauris tempor magna et rhoncus egestas. Mauris odio dui, malesuada quis maximus vitae, consequat a massa. Donec eget ante lacinia quam feugiat ullamcorper et eget eros. Fusce vitae facilisis nunc. Integer gravida nec arcu id vehicula. Sed sit amet interdum libero. Aenean blandit feugiat est, eget finibus justo condimentum viverra. Sed rhoncus pulvinar dui. Proin varius felis et egestas molestie. Pellentesque tortor odio, imperdiet tempus imperdiet pulvinar, posuere eu turpis. Suspendisse lacinia sem nec nibh auctor efficitur. Maecenas lobortis viverra urna nec rhoncus. Mauris et euismod diam, id scelerisque urna.
                </p>
            </div>
        </div>
    );
};

export default LeaderboardPage;