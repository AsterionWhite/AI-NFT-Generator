import "./GeneratedGrid.css";
import * as IPFS from 'ipfs-core';
import { useEffect, useState } from "react";
import checkmark from './assets/check64.png';
import MintNft from "./MintNft";

const GeneratedGrid = ({ generatedImages }) => {
  const underlyingGridCards = Array(4).fill({ url: null });

  const [ipfsNode, setIpfsNode] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeMetadataForm, setActiveMetadataForm] = useState(false);
  const [metadataInput, setMetadataInput] = useState(null);

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


  const toggleMetaDataForm = (imgIdx) => {
    const selectedImages = document.getElementsByClassName('grid-image-wrapper');
    const selectedImagesWrapper = document.getElementsByClassName('generated-image-wrapper');
  
    const selectedImageForMetaData = selectedImages[imgIdx] || selectedImages[0];
    const selectedImageWrapperForMetaData = selectedImagesWrapper[imgIdx] || selectedImagesWrapper[0];

    selectedImageForMetaData.classList.toggle('expand-image')
    selectedImageWrapperForMetaData.classList.toggle('expand-image-wrapper');

    setActiveMetadataForm(!activeMetadataForm)
  }

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

          const buttonText = activeMetadataForm ? 'Save metadata' : 'Add custom metadata to your NFT !';
          // EXTRACT TO A NEW COMPONENT 
          const nftCardElement = image.url ? (
            <div className="grid-image-wrapper">
              <img onClick={(e) => selectImage(e, image.url)} className="generated-image" src={image.url} />
              <div className="hidden-overlay">
                <img src={checkmark} />
                { activeMetadataForm && <textarea onChange={e => setMetadataInput(e.target.value)} placeholder="Enter a valid JSON object for your metadata" draggable={false} maxLength={250} className="metadata-textarea" />}
              </div>
              <button onClick={() => toggleMetaDataForm(idx)} className="add-meta-data-btn" type='button'>{buttonText}</button>
            </div>
          ) : (
            <div className="generated-image" src={image.url} />
          );
          return <div className="generated-image-wrapper" key={`generated-image-${idx}`}>{nftCardElement}</div>;
        })}
      </div>

      <MintNft ipfsNode={ipfsNode} selectedImages={selectedImages} readyToMint={readyToMint} />
    </div>
  );
};

export default GeneratedGrid;
