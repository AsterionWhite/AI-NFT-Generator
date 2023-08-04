import "./GeneratedGrid.css";
import { useEffect, useState } from "react";
import MintNft from "../MintNft/MintNft";
import GeneratedNFTCard from "../GeneratedNFTCard/GeneratedNFTCard";
import { create } from 'ipfs-http-client';


const GeneratedGrid = ({ generatedImages, setLoadingGeneratingImages, selectedImages, setSelectedImages }) => {
  const underlyingGridCards = Array(4).fill({ url: null });

  const [ipfsNode, setIpfsNode] = useState(null);

  let ipfs = null;

  useEffect(() => {
    if(!ipfs) {
      greateIpfsNode();
    }
  }, []);

  const greateIpfsNode = async () => {
    try {
      if (!ipfsNode) {

        // Connect to PINATA PUBLIC GATEWAY
        const ipfs = await create('https://gateway.pinata.cloud/ipfs/bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m');
   
        setIpfsNode(ipfs);
      }
    } catch (error) {
      console.log(error, "ipfs create error");
    }
  };

  const readyToMint = selectedImages.length > 0;

  return (
    <>
    <div className="grid-container">
      <p className="mint-description">Select one image to be minted</p>
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
            return (
              <GeneratedNFTCard
                key={`generated-image-${idx}`}
                image={image}
                imageIdx={idx}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            );
        })}
      </div>

      <MintNft
        selectedImages={selectedImages}
        readyToMint={readyToMint}
        setLoadingGeneratingImages={setLoadingGeneratingImages}
      />
    </div>
    </>
  );
};

export default GeneratedGrid;