require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",
  allowUnlimitedContractSize: true,
  networks: {
    mumbai: {
      url: process.env.REACT_APP_MUMBAI_TESTNET_URL,
      accounts: [process.env.REACT_APP_WALLET_PRIV_KEY],
    },
  },
};
