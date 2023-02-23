import { ethers } from "hardhat";

async function main() {
  const AiNFTGenerator = await ethers.getContractFactory("AiNFTGenerator");
  const aiNFTGenerator = await AiNFTGenerator.deploy();

  await aiNFTGenerator.deployed();

  console.log(
    `aiNFTGenerator with 0.01 ETH and unlock timestamp deployed to ${aiNFTGenerator.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
