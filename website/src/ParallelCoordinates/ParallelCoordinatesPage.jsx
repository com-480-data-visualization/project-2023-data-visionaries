import ParallelCoordinates from "./ParallelCoordinates";

const ParallelCoordinatesPage = ({ id }) => {
    return <div id={id} style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: "70%", margin: "auto", justifyContent: "center" }}>
        <div>
            <h2>Parallel coordinates</h2>
            <ParallelCoordinates />
        </div>
    </div>;
}

export default ParallelCoordinatesPage;