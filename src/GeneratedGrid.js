import "./GeneratedGrid.css";
import * as IPFS from 'ipfs-core';
import { useEffect, useState } from "react";
import checkmark from './assets/check64.png';

const GeneratedGrid = ({ generatedImages }) => {
  const underlyingGridCards = Array(4).fill({ url: null });

  const [ipfsNode, setIpfsNode] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  let ipfs = null;

  useEffect(() => {
    greateIpfsNode();
  }, [])

  const greateIpfsNode = async() => {
    try {
      if(!ipfsNode) {
        ipfs = await IPFS.create({repo:'ok'+Math.random()});
        setIpfsNode(ipfs);
      }
      
    } catch (error) {
      console.log(error, 'ipfs create error')
    }
  }


  const selectImage = async(e, imageUrl) => {
    const imageUrlExistsInCollection = selectedImages.indexOf(imageUrl) >= 0;
    let imageUrlCollection = [...selectedImages, imageUrl];

    e.currentTarget.classList.toggle('image-selected');

    if(imageUrlExistsInCollection) {
      imageUrlCollection = imageUrlCollection.filter(url => url !== imageUrl);
    }
    setSelectedImages(imageUrlCollection);
    // let file;
    // console.log(ipfsNode, 'check ipfs')
    // if(ipfsNode) {
    //   console.log(imageUrl, 'ur; ???');
    //   file = await ipfsNode.add(JSON.stringify(IPFS.urlSource(imageUrl)));
    // }

    // console.log(file, 'file ...')
  }
  // console.log(ipfsNode, 'ipfs maina ????')
  // console.log(selectedImages, 'selectedImages maina ????')
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
            <>
              <img onClick={(e) => selectImage(e, image.url)} className="generated-image" src={image.url} />
              <div className="hidden-overlay">
                <img src={checkmark} />
              </div>
            </>
          ) : (
            <div className="generated-image" src={image.url} />
          );
          return <div style={{position: 'relative'}} key={`generated-image-${idx}`}>{nftCardElement}</div>;
        })}
      </div>
    </div>
  );
};

export default GeneratedGrid;
