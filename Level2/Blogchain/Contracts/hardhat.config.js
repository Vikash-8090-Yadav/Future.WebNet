require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
task("accounts", "List of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.11",
  networks: {
    mumbai: {
      url: process.env.URL_MUMBAI,
      accounts: [process.env.ACCOUNT_MUMBAI],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};
