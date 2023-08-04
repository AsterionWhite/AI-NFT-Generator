import { useState, useEffect } from "react";
import contractData from "../../smart_contract/artifacts/contracts/AiNFTGenerator.sol/AiNFTGenerator.json";
import { Contract } from "alchemy-sdk";
import "./MintNft.css";
import { decode } from "base64-arraybuffer";
import { uploadToIPFS } from "../../service/uploadToIPFS";
import * as ethers from "ethers";

// import { alchemyConfigSettings } from "../../const";
// const alchemyInstance = new Alchemy(alchemyConfigSettings);

// 0xEe3071b2C5b8B5868586D99791bC7b6717134631
// 0x55EB999b3D6aD9f44c669fe72Db7BD11Dee8be9a
// 0x4E6593577698D2Dc067e57C8238EeF96ca9b0E86

// const contractAddress = "0x89E216d4E3b7bACf351Ffff5095B2ECcf15Cb1fa";
const contractAddress = "0x4E6593577698D2Dc067e57C8238EeF96ca9b0E86";

const MintNft = (props) => {
  const { selectedImages, readyToMint, setLoadingGeneratingImages } = props;

  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    if(connectionError && !readyToMint) {
      setConnectionError(null);
    }
  }, [readyToMint])

  const mintNftHandler = async () => {
    setLoadingGeneratingImages(true);

    if (connectionError) {
      setConnectionError(null);
    }

    const urlWithMetadata = selectedImages.map((image) => {
      const parsedMetadata = JSON.parse(image.metadata);

      const metadataObj = {};
      metadataObj.attributes = [];

      if(parsedMetadata) {
        // Convert user inserted metadata to OpenSea compliant format
        Object.entries(parsedMetadata).map(
          ([key, val]) => {
            metadataObj.image = `${image.imageURL}`;
  
            if (key === "name" || key === "description") {
              metadataObj[key] = val;
            } else {
              metadataObj.attributes.push({ "trait_type": key, value: val });
            }
  
            return metadataObj;
          }
        );
      }

      return {
        path: image.imageURL,
        content: metadataObj,
      };
    });

    const formData = new FormData();

    formData.append("file", new Blob([decode(urlWithMetadata[0].path)]));

    const metadata = JSON.stringify({
      name: "Ai Generated File",
    });

    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append("pinataOptions", options);

    let imageCID = null;

    // TODO Extract to a service
    try {
      const response = await uploadToIPFS('pinFileToIPFS', `multipart/form-data; boundary=${formData._boundary}`, formData);

      imageCID = response.data;
    } catch (error) {
      console.log(error);
    }

    // Overwrite image property with hash from IPFS
    const formatMetadata = {
      pinataContent: {
        ...urlWithMetadata[0].content,
        image: `https://ipfs.io/ipfs/${imageCID.IpfsHash}`,
      },
    };

    const fullMetadata = JSON.stringify(formatMetadata);

    let metadataResponse = null;

    try {
      const metadataRes = await uploadToIPFS('pinJSONToIPFS', 'application/json', fullMetadata);

      metadataResponse = `https://ipfs.io/ipfs/${metadataRes.data.IpfsHash}`;
    } catch (error) {
      console.log(error);
    }

    try {

      // ALCHEMY APPROACH

      // const providerOrig = await alchemyInstance.config.getProvider();

      // const wallet = new Wallet(
      //   process.env.REACT_APP_WALLET_PRIV_KEY,
      //   providerOrig
      // );

      // const connect = await contractInstance.connect(wallet);
      // const setUri = await connect.setURI(metadataResponse);

      // const mint = await connect.mint(txCount + 1, Number(1), setUri.data);

      //TODO Implement multiple images mint
      // const mint = await connect.mintBatch(contractAddress, [Number(1)], [Number(1)], setUri.data);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const walletAddress = window.ethereum.selectedAddress;    // first account in MetaMask

      const txCount = await provider.getTransactionCount(
        walletAddress,
        "latest"
      );

      const contractInstance = new Contract(
        contractAddress,
        contractData.abi,
        provider
      );

      const signer = provider.getSigner(walletAddress)

      const setUri = await signer.sendTransaction({
        to: contractAddress,
        data: contractInstance.interface.encodeFunctionData('setURI', [metadataResponse])
      })

      const mint = await signer.sendTransaction({
        to: contractAddress,
        data: contractInstance.interface.encodeFunctionData('mint', [txCount + 1, Number(1), setUri.data])
      })

      await mint.wait();

      console.log(mint, "successfully minted");

      document.dispatchEvent(
        new CustomEvent("minted", { detail: { minted: true } })
      );
      setLoadingGeneratingImages(false);
    } catch (error) {
      console.log(error, "ERROR");
      setLoadingGeneratingImages(false);
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