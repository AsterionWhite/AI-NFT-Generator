import "./GeneratedGrid.css";

const GeneratedGrid = ({ generatedImages }) => {
  const underlyingGridCards = Array(4).fill({ url: null });

  return (
    <div className="grid-container">
      <div className="underlying-grid-wrapper">
        {underlyingGridCards.map((_, idx) => {
          return (
            <div key={`underlying-image-${idx}`}>
              <div className="underlying-image" />
            </div>
          );
        })}
      </div>
      <div className="grid-wrapper">
        {generatedImages.map((image, idx) => {
          const nftCardElement = image.url ? (
            <img className="generated-image" src={image.url} />
          ) : (
            <div className="generated-image" src={image.url} />
          );
          return <div key={`generated-image-${idx}`}>{nftCardElement}</div>;
        })}
      </div>
    </div>
  );
};

export default GeneratedGrid;
