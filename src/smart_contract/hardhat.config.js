require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",
  allowUnlimitedContractSize: true,
  networks: {
    goerli: {
      url: process.env.REACT_APP_GOERLI_TESTNET_URL,
      accounts: [process.env.REACT_APP_WALLET_PRIV_KEY],
    },
  },
};
