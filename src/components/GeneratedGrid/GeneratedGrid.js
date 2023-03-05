import "./GeneratedGrid.css";
import * as IPFS from "ipfs-core";
import { useEffect, useState } from "react";
import MintNft from "../MintNft/MintNft";
import GeneratedNFTCard from "../GeneratedNFTCard/GeneratedNFTCard";

const GeneratedGrid = ({ generatedImages }) => {
  const underlyingGridCards = Array(4).fill({ url: null });

  const [ipfsNode, setIpfsNode] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  let ipfs = null;

  useEffect(() => {
    greateIpfsNode();
  }, []);

  const greateIpfsNode = async () => {
    try {
      if (!ipfsNode) {
        ipfs = await IPFS.create({ repo: "ok" + Math.random() });
        setIpfsNode(ipfs);
      }
    } catch (error) {
      console.log(error, "ipfs create error");
    }
  };

  const readyToMint = selectedImages.length > 0;

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
        ipfsNode={ipfsNode}
        selectedImages={selectedImages}
        readyToMint={readyToMint}
      />
    </div>
  );
};

export default GeneratedGrid;