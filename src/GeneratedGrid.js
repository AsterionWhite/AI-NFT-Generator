import "./GeneratedGrid.css";
import * as IPFS from 'ipfs-core';
import { useEffect } from "react";

const GeneratedGrid = ({ generatedImages }) => {
  const underlyingGridCards = Array(4).fill({ url: null });

  let ipfs = null;

  useEffect(() => {
    greateIpfsNode();
  }, [])

  const greateIpfsNode = async() => {
    try {
      if(!ipfs) {
        ipfs = await IPFS.create({repo: 'ok'+ Math.random()})
      }
      
    } catch (error) {
      console.log(error, 'ipfs create error')
    }
  }


  const selectImage = async(imageUrl) => {
    console.log(imageUrl, 'ur; ???');
    let file;
    if(ipfs) {
      file = await ipfs.add(IPFS.urlSource(imageUrl));
    }

    console.log(file, 'file ...')
  }
  console.log(ipfs, 'ipfs maina ????')
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
          return <div onClick={() => selectImage(image.url)} key={`generated-image-${idx}`}>{nftCardElement}</div>;
        })}
      </div>
    </div>
  );
};

export default GeneratedGrid;
