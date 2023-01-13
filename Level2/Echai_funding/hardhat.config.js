// hardhat defaultly set his deployment to local blockchain for testing now we want to deploy it realtime (global) testnetwork so we have to setup network

require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config(); // we use dotenv cause we dont want to revil our api or private keys
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};