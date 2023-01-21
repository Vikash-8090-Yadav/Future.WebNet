require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  // Our hardhat local network set up
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
  // Path were our contract will be deployed
  paths:{
    artifacts:"./client/src/artifacts",
  }
}
