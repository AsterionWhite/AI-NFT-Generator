import { useState } from "react";
import "./GenerateNFTForm.css";
import { NFT_SIZES } from "./const";
import GeneratedGrid from "./GeneratedGrid";
import { generateImage } from "./service/generateImage";

const GenerateNFT = () => {
  const [inputQuery, setInputQuery] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(NFT_SIZES.medium);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generatingImageError, setGeneratingImageError] = useState(null);
  const [loadingGeneratingImages, setLoadingGeneratingImages] = useState(false);

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();
    // setLoadingGeneratingImages(true);

    // try {
    //   const generatedImagesResponse = await generateImage(
    //     inputQuery,
    //     selectedQuantity,
    //     selectedSize
    //   );

    //   if (generatedImagesResponse.data && generatedImagesResponse.data.data) {
    //     setGeneratedImages(generatedImagesResponse.data.data);
    //     setLoadingGeneratingImages(false);
    //   }
    // } catch (error) {
    //   setGeneratingImageError(error.response.data.error.message);
    //   setLoadingGeneratingImages(false);
    // }
  };

  const showGeneratedGrid =
    // loadingGeneratingImages || generatedImages.length > 0;
    true;

  console.log(showGeneratedGrid, "show it ????");

  const generatedImagesData =
    generatedImages.length > 0
      ? generatedImages
      : Array(selectedQuantity).fill({ url: null });

  console.log(generatedImagesData, "generatedImagesData ??? >>>> ?");
  // console.log(generateArray, "fake generateArray ??? >>>> ?");

  return (
    <>
      <form onSubmit={onSubmitFormHandler} className="container">
        <div className="flex-wrapper">
          <p className="description margin">
            Input text to generate the desired image with AI:
          </p>{" "}
          <input
            className="generate-input margin"
            placeholder="German shepherd catching a frisbee in midair at the park realistic 4k"
            type="text"
            maxLength={250}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
          />
        </div>
        <div className="flex-wrapper">
          <p className="description margin">
            How many instances of the image the AI should generate:
          </p>
          <select
            className="select-input margin"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <div className="flex-wrapper">
          <p className="description margin">
            Select a size of the generated image:
          </p>
          <select
            className="select-input margin"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option>{NFT_SIZES.small}</option>
            <option>{NFT_SIZES.medium}</option>
            <option>{NFT_SIZES.large}</option>
          </select>
        </div>
        <div className="flex-wrapper">
          <div className="generate-button-wrapper margin">
            <button type="submit" className="generate-btn">
              Generate Image
            </button>
          </div>
        </div>
      </form>
      <div>
        {generatingImageError && (
          <p className="description margin">{generatingImageError}</p>
        )}
      </div>
      {showGeneratedGrid && (
        <GeneratedGrid generatedImages={generatedImagesData} />
      )}
    </>
  );
};

export default GenerateNFT;