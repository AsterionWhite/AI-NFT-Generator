import { useState } from "react";
import checkmark from "../../assets/check64.png";
import { validateJSONMetadata } from "../../helpers/validateJSONMetadata";
import './GeneratedNFTCard.css';

const GeneratedNFTCard = (props) => {

  const { image, imageIdx, selectedImages, setSelectedImages } = props; 

  const [activeMetadataForm, setActiveMetadataForm] = useState(false);
  const [metadataInput, setMetadataInput] = useState(null);
  const [metadataInputError, setMetadataInputError] = useState(null);


  const selectImage = async (e, imageUrl) => {
    const imageUrlExistsInCollection = selectedImages.indexOf(imageUrl) >= 0;
    let imageUrlCollection = [...selectedImages, imageUrl];

    e.currentTarget.classList.toggle("image-selected");

    if (imageUrlExistsInCollection) {
      imageUrlCollection = imageUrlCollection.filter((url) => url !== imageUrl);
    }
    setSelectedImages(imageUrlCollection);
  };

  const toggleMetaDataForm = () => {
    if (activeMetadataForm) {
      const isValidJSON = validateJSONMetadata(metadataInput);

      if (!isValidJSON) {
        const findTextAreaElements =
          document.getElementsByClassName("metadata-textarea");

        const selectActiveTextAreaElement =
          findTextAreaElements[imageIdx] || findTextAreaElements[0];
        selectActiveTextAreaElement.classList.add(
          "metadata-textarea-wrong-input"
        );

        setMetadataInputError(
          "Invalid JSON entry ! Try using an online tool to validate your JSON object."
        );

        return;
      }
    }

    // Find selected image and its wrapper
    const selectedImages =
      document.getElementsByClassName("grid-image-wrapper");
    const selectedImagesWrapper = document.getElementsByClassName(
      "generated-image-wrapper"
    );

    const selectedImageForMetaData =
      selectedImages[imageIdx] || selectedImages[0];
    const selectedImageWrapperForMetaData =
      selectedImagesWrapper[imageIdx] || selectedImagesWrapper[0];

    // Apply expand classnames to the selected image and its wrapper
    selectedImageForMetaData.classList.toggle("expand-image");
    selectedImageWrapperForMetaData.classList.toggle("expand-image-wrapper");

    setActiveMetadataForm(!activeMetadataForm);

    if (metadataInputError) {
      setMetadataInputError(null);
    }
  };

  const buttonText = activeMetadataForm
    ? "Save metadata"
    : "Add custom metadata to your NFT !";
  // EXTRACT TO A NEW COMPONENT
  const nftCardElement = image.url ? (
    <div className="grid-image-wrapper">
      <img
        onClick={(e) => selectImage(e, image.url)}
        className="generated-image"
        src={image.url}
      />
      <div className="hidden-overlay">
        <img src={checkmark} />
        {activeMetadataForm && (
          <div className="metadata-wrapper">
            <p>{metadataInputError && metadataInputError}</p>
            <textarea
              onChange={(e) => setMetadataInput(e.target.value)}
              placeholder="Enter a valid JSON object for your metadata"
              draggable={false}
              maxLength={250}
              className="metadata-textarea"
            />
          </div>
        )}
      </div>
      <button
        onClick={toggleMetaDataForm}
        className="add-meta-data-btn"
        type="button"
      >
        {buttonText}
      </button>
    </div>
  ) : (
    <div className="generated-image" src={image.url} />
  );
  return (
    <div className="generated-image-wrapper" key={`generated-image-${imageIdx}`}>
      {nftCardElement}
    </div>
  );
};

export default GeneratedNFTCard;