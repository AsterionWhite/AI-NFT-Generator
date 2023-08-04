const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const url = process.env.REACT_APP_MUMBAI_TESTNET_URL;

  let artifacts = await hre.artifacts.readArtifact("AiNFTGenerator");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.REACT_APP_WALLET_PRIV_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a AiNFTGenerator Factory
  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  // Contract level metadata
  const formatMetadata = {
    name: "Crazy bunch of alchemists",
    description:
      "Crazy but also very cool collection of the most profound alchemists out there !",
    image:
      "https://ipfs.io/ipfs/QmZsfp4Ajs2qnhtM3ZgNSYyq7Zgop3oHpWXSvbaDTTJrVF",
  };

  const fullMetadata = JSON.stringify(formatMetadata);
  const connectContract = await factory.connect(wallet);

  await connectContract.interface.encodeFunctionData("setContractURI", [
    fullMetadata,
  ]);

  const AiNFTGenerator = await factory.deploy();

  console.log("AiNFTGenerator address:", AiNFTGenerator.address);

  await AiNFTGenerator.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
