import { useState, useEffect } from "react";
import checkmark from "../../assets/check64.png";
import { validateJSONMetadata } from "../../helpers/validateJSONMetadata";
import './GeneratedNFTCard.css';


const GeneratedNFTCard = (props) => {

  const { image, imageIdx, selectedImages, setSelectedImages } = props; 

  const [activeMetadataForm, setActiveMetadataForm] = useState(false);
  const [metadataInput, setMetadataInput] = useState(null);
  const [metadataInputError, setMetadataInputError] = useState(null);


  useEffect(() => {
    document.addEventListener('minted', () => {
      const findSelectedImage = document.getElementsByClassName('image-selected');
      findSelectedImage[0].classList.add('minted');
      setMetadataInput(null);
    })

    return () => {
      document.removeEventListener('minted', () => null)
    }
  } , []);

  const selectImage = async (e, imageUrl) => {
    const imageUrlExistsInCollection = selectedImages.some(image => image.imageURL === imageUrl);

    let imageUrlCollection = [...selectedImages, {imageURL: imageUrl, metadata: null}];

    if (imageUrlExistsInCollection) {
      imageUrlCollection = imageUrlCollection.filter((url) => url.imageURL !== imageUrl);
    }

    if(imageUrlCollection.length <= 1) {
      setSelectedImages(imageUrlCollection);
    }else {
      return null;
    }

    e.currentTarget.classList.toggle("image-selected");
  };

  const toggleMetaDataForm = (imageUrl) => {
    const { selectedImages: selectedNFTImages } = props;

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

      // Remove extra whitespace from the JSON object
      const jsonInput = metadataInput && metadataInput.length > 0 ? JSON.stringify(JSON.parse(metadataInput)) : null;

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

  let buttonText = "Add metadata to your NFT !";

  if(activeMetadataForm) {
    buttonText = "Save metadata";
  }
  if(selectedImages.length > 0 && selectedImages[0].metadata) {
    buttonText = "Metadata applied !"
  }

  const nftCardElement = image.b64_json ? (
    <div className="grid-image-wrapper">
      <img
        onClick={(e) => selectImage(e, image.b64_json)}
        className="generated-image"
        src={`data:image/png;base64,${image.b64_json}`}
        
      />
      <div className="hidden-overlay">
        <img src={checkmark} />
        {activeMetadataForm && (
          <div className="metadata-wrapper">
            <p>{metadataInputError && metadataInputError}</p>
            <textarea
              onChange={(e) => setMetadataInput(e.target.value)}
              placeholder='{
                "name": "My awesome AI generated NFT",
                "description": "Dog walking on the street",
                ......
              }'
              draggable={false}
              maxLength={250}
              className="metadata-textarea"
              value={metadataInput}
            />
          </div>
        )}
      </div>
      <button
        onClick={() => toggleMetaDataForm(image.b64_json)}
        className="add-meta-data-btn"
        type="button"
      >
        {buttonText}
      </button>
    </div>
  ) : (
    <div className="generated-image-placeholder" src={`data:image/png;base64,${image.b64_json}`} />
  );
  return (
    <>
    <div className="generated-image-wrapper">
      {nftCardElement}
    </div>
    </>
  );
};

export default GeneratedNFTCard;