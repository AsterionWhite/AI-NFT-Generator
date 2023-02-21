import "./GeneratedGrid.css";

const GeneratedGrid = ({ generatedImages }) => {
  console.log(generatedImages, "generated ?????");
  return (
    <div className="grid-container">
      {generatedImages.map((image, idx) => {
        return (
          <div key={`generated-image-${idx}`}>
            <img className="generated-image" src={image.url} />
          </div>
        );
      })}
    </div>
  );
};

export default GeneratedGrid;
