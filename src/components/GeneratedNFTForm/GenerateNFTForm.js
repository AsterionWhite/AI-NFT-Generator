import { useState, useEffect } from "react";
import "./GenerateNFTForm.css";
import GeneratedNFTFormFields from '../GeneratedNFTFormFields/GeneratedNFTFormFields';
import { alchemyConfigSettings, NFT_SIZES, supportedNetworks } from "../../const";
import GeneratedGrid from "../GeneratedGrid/GeneratedGrid";
import Loader from "../Loader/Loader";
import { generateImage } from "../../service/generateImage";
import * as ethers from "ethers";
import { Alchemy, Utils } from "alchemy-sdk";



const alchemyInstance = new Alchemy(alchemyConfigSettings);
const provider = new ethers.providers.Web3Provider(window.ethereum);


const GenerateNFT = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(NFT_SIZES.medium);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [generatingImageError, setGeneratingImageError] = useState(null);
  const [loadingGeneratingImages, setLoadingGeneratingImages] = useState(false);

  const [isSupportedNetwork, setIsSupportedNetwork] = useState(true);
  const [walletBalance, setWalletBalance] = useState(null);
  const [errorWalletConnect, setErrorWalletConnect] = useState(null);

  const scrollIntoViewNft = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 600,
        behavior: "smooth",
      });
    }, 500);
  };

  useEffect(() => {
    provider.provider.on("chainChanged", checkCurrentNetwork);

    return () =>
      provider.provider.removeListener("chainChanged", checkCurrentNetwork);
  }, [isSupportedNetwork]);

  const checkCurrentNetwork = (chainID) => {
    if (supportedNetworks.every((data) => data.chainId !== chainID)) {
      setWalletBalance(null);
      setIsSupportedNetwork(false);
    }
    if (supportedNetworks.some((data) => data.chainId === chainID)) {
      setIsSupportedNetwork(true);
      if (!walletBalance) {
        getAddress(false, chainID);
      }
    }
  };

  const getAddress = async (checkNetwork = true, chainId = null) => {
    if (errorWalletConnect) {
      setErrorWalletConnect(null);
    }
    try {
      let currentNetwork = null;

      if (checkNetwork) {
        currentNetwork = await provider.getNetwork();
        checkCurrentNetwork(currentNetwork.chainId);
      }

      const accounts = await provider.send("eth_requestAccounts", []);

      const getTestMaticBalance = await alchemyInstance.core.getBalance(
        accounts[0]
      );
      const formatTokenBalance = Utils.formatUnits(
        getTestMaticBalance._hex,
        "18"
      );

      if (
        ((currentNetwork && currentNetwork.chainId === 80001) ||
          chainId === 80001) &&
        walletBalance !== `${formatTokenBalance} Matic`
      ) {
        setWalletBalance(
          `${accounts[0]} - ${parseFloat(formatTokenBalance).toFixed(6)} MATIC`
        );
      }
    } catch (error) {
      setErrorWalletConnect(error.message);
    }
  };

  const onSubmitFormHandler = async (e) => {
    // Set loading state
    setLoadingGeneratingImages(true);
    // Reset error if any exists
    if (generatingImageError) {
      setGeneratingImageError(null);
    }

    if (selectedImages.length > 0) {
      const findMintedImage = document.getElementsByClassName("minted");

      for (let i = 0; i <= findMintedImage.length; i++) {
        if (findMintedImage[i]) {
          findMintedImage[i].classList.remove("minted", "image-selected");
        }
      }

      setSelectedImages([]);
    }

    // Prevent page from reloading
    e.preventDefault();
    // Scroll the page so the NFT cards to be fully visible
    scrollIntoViewNft();

    try {
      const generatedImagesResponse = await generateImage(
        inputQuery,
        selectedQuantity,
        selectedSize
      );

      const imageURL = await generatedImagesResponse.json();

      if (imageURL && imageURL.data) {
        setGeneratedImages(imageURL.data);
        setLoadingGeneratingImages(false);
      }
      if (imageURL && imageURL.error) {
        setGeneratingImageError(imageURL.error.message);
        setLoadingGeneratingImages(false);
      }
    } catch (error) {
      console.log(error, "error maina");
      setGeneratingImageError(error.response.data.error.message);
      setLoadingGeneratingImages(false);
    }
  };

  let generatedImagesData = [];

  if (selectedQuantity > 0) {
    generatedImagesData = Array(selectedQuantity).fill({ url: null });
  }
  if (generatedImages.length > 0) {
    generatedImagesData = generatedImages;
  }

  const buttonMessage = walletBalance ? walletBalance : "Connect your wallet:";

  return (
    <div className="form-wrapper">
      <h1 className="main-heading">
        Use OpenAI's neural network Dall-E to generate image from text.
        Afterwards you can choose to mint that image on the Polygon blockchain.
      </h1>
      <div className="wallet-wrapper">
        <button onClick={getAddress} className="connect-wallet">
          {buttonMessage}
        </button>
        {(!isSupportedNetwork && !errorWalletConnect) && (
          <p className="warning-message">
            Switch to a supported network chain -{" "}
            <span>
              "{supportedNetworks.map((network) => `${network.name}`)}"
            </span>{" "}
          </p>
        )}
        {errorWalletConnect && (
          <p className="error-description">{errorWalletConnect}</p>
        )}
      </div>
      <div className="generation-form-wrapper">
        <GeneratedNFTFormFields
            inputQuery={inputQuery}
            selectedSize={selectedSize}
            selectedQuantity={selectedQuantity}
            generatingImageError={generatingImageError}
            setInputQuery={setInputQuery}
            setSelectedSize={setSelectedSize}
            setSelectedQuantity={setSelectedQuantity}
            onSubmitFormHandler={onSubmitFormHandler}
        />
        
        <GeneratedGrid
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          generatedImages={generatedImagesData}
          setLoadingGeneratingImages={setLoadingGeneratingImages}
        />
      </div>
      {!generatingImageError && loadingGeneratingImages && <Loader />}
    </div>
  );
};

export default GenerateNFT;
