import D3WorldMapVisualisation from "./D3WorldMapVisualisation";

const WorldMapPage = ({ id }) => {
    return (
        <div id={id}>
            <h2>3. Mapping Happiness</h2>
            <p>
                Suspendisse sit amet nisi eu orci commodo condimentum. Aenean tincidunt facilisis tempus. Cras quis tempus magna. Aliquam et viverra diam. Cras ante massa, aliquam et dignissim in, aliquam eget elit. Praesent a urna justo. Nunc vulputate felis orci, eget consequat purus imperdiet nec.
                Mauris tempor magna et rhoncus egestas. Mauris odio dui, malesuada quis maximus vitae, consequat a massa. Donec eget ante lacinia quam feugiat ullamcorper et eget eros. Fusce vitae facilisis nunc. Integer gravida nec arcu id vehicula. Sed sit amet interdum libero. Aenean blandit feugiat est, eget finibus justo condimentum viverra. Sed rhoncus pulvinar dui. Proin varius felis et egestas molestie. Pellentesque tortor odio, imperdiet tempus imperdiet pulvinar, posuere eu turpis. Suspendisse lacinia sem nec nibh auctor efficitur. Maecenas lobortis viverra urna nec rhoncus. Mauris et euismod diam, id scelerisque urna.
            </p>
            <D3WorldMapVisualisation height={800} width={"100%"} />
        </div>
    );
};

export default WorldMapPage;