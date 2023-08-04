import { Network } from "alchemy-sdk";

export const NFT_SIZES = {
  small: "256x256",
  medium: "512x512",
  large: "1024x1024",
};

export const NFT_ENDPOINTS = {
  create: "https://api.openai.com/v1/images/generations",
  update: "https://api.openai.com/v1/images/edits",
};


export const alchemyConfigSettings = { 
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI
}

export const supportedNetworks = [{ chainId: 80001, name: "Polygon Mumbai" }];