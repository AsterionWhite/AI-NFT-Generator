import { useState } from "react";
import contractData from '../../smart_contract/artifacts/contracts/AiNFTGenerator.sol/AiNFTGenerator.json'
import { Alchemy ,Network } from "alchemy-sdk";
import "./MintNft.css";

const alchemyConfigSettings = { 
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI
}

const alchemyInstance = new Alchemy(alchemyConfigSettings);

// CONTRACT DEPLOYED TO: 0x783C5803a0CC3461f0d0E8eEb46e200147eA35b1

const MintNft = (props) => {
  const { ipfsNode, selectedImages, readyToMint } = props;

  const [walletAddress, setWalletAddress] = useState("");
  const [connectionError, setConnectionError] = useState(null);


  const mintNftHandler = async () => {
    if (connectionError) {
      setConnectionError(null);
    }

    const urlWithMetadata = selectedImages.map(image => {
        return `${image.imageURL}&meta=${image.metadata}`
    })

    const result = [];
    // Uploading combined url + metadata to IPFS
    if (ipfsNode) {
      console.log('ADDING TO IPFS !!!!')
        for await (const resultPart of ipfsNode.addAll(urlWithMetadata)) {
        result.push(resultPart);
      }
    }

    // const nftsIpfsUrl = result.map((ipfsResponse) => {
    //   try {
    //     const nftIpfsUrl = axios.get(`https://ipfs.io/ipfs/${ipfsResponse.path}`);
    //     return nftIpfsUrl;
    //   } catch (error) {
    //     console.log(error, 'error getting URL from IPFS')
    //   }

    // })

    // const resolveIpfs = Promise.all(nftsIpfsUrl).then(data => {
    //   console.log(data, "!!!!! data ipfs");

    // });

    // console.log(result, "result ipfs");
    // console.log(resolveIpfs, "resolveIpfs ipfs");
    try {
      const waletAddress = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const contractInstance = new ethers.Contract('0x783C5803a0CC3461f0d0E8eEb46e200147eA35b1', contractData.abi, waletAddress);
      console.log(waletAddress, "signer ipfs");
      console.log(contractInstance, 'contractInstance ????')
    } catch (error) {
      setConnectionError(error);
    }
  };

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
