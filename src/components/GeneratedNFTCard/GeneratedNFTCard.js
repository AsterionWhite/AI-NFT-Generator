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
    const imageUrlExistsInCollection = selectedImages.some(image => image.imageURL === imageUrl);
    let imageUrlCollection = [...selectedImages, {imageURL: imageUrl, metadata: null}];

    e.currentTarget.classList.toggle("image-selected");

    if (imageUrlExistsInCollection) {
      imageUrlCollection = imageUrlCollection.filter((url) => url.imageURL !== imageUrl);
    }

    setSelectedImages(imageUrlCollection);
  };

  const toggleMetaDataForm = (imageUrl) => {
    const { selectedImages: selectedNFTImages } = props;

    if (activeMetadataForm) {
      console.log(metadataInput, 'input metadata')
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

      // Remove extra whitespace from the JSON object
      const jsonInput = JSON.stringify(JSON.parse(metadataInput));

      // If the JSON is valid , append the metadata to the url of that image
      const updateNFTMetadata = selectedNFTImages.filter(nft => {
        if(nft.imageURL === imageUrl) {
          nft.metadata = jsonInput;
        }

        return true;
      });

      setSelectedImages(updateNFTMetadata);
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
        onClick={() => toggleMetaDataForm(image.url)}
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
    <div className="generated-image-wrapper">
      {nftCardElement}
    </div>
  );
};

export default GeneratedNFTCard;