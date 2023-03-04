import { useState } from "react";
import "./MintNft.css";

// CONTRACT DEPLOYED TO: 0x783C5803a0CC3461f0d0E8eEb46e200147eA35b1

const MintNft = (props) => {
  const { ipfsNode, selectedImages, readyToMint } = props;

  const [walletAddress, setWalletAddress] = useState("");
  const [connectionError, setConnectionError] = useState(null);

  console.log(props, "props");

  const mintNftHandler = async () => {
    if (connectionError) {
      setConnectionError(null);
    }

    const addMetaData = selectedImages.map(image => {
        console.log(image, 'image maina ....')
        return image + '&meta=my meta data'
    })

    console.log(addMetaData, 'meta data .....')

    const result = [];
    if (ipfsNode) {
    //   for await (const resultPart of ipfsNode.addAll(selectedImages)) {
        for await (const resultPart of ipfsNode.addAll(addMetaData)) {
        result.push(resultPart);
      }
    }

    console.log(result, "result ipfs");
    try {
      const mintAddress = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(mintAddress, "mintAddress ipfs");
    } catch (error) {
      setConnectionError(error);
    }
  };

  console.log(readyToMint, "ready to mint");

  return (
    <>
      <div className="connection-error-message">
        {connectionError && <p>{connectionError.message}</p>}
      </div>

      <div className="mint-nft-wrapper">
        <button
          onClick={mintNftHandler}
          className="mint-nft-btn"
          disabled={!readyToMint}
          type="button"
        >
          Mint
        </button>
      </div>
    </>
  );
};

export default MintNft;
