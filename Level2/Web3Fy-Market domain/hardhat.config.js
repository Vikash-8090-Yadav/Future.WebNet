require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
   
  networks:{
     ganache:{
        url:"http://127.0.0.1:7545",
        accounts:[process.env.REACT_APP_PRIVATE_KEY]
     },
     /* goerli:{
        url:,
        accounts:[process.env.REACT_APP_PRIVATE_KEY]
     },*/
     polygon:{
        url:'https://polygon-mumbai.g.alchemy.com/v2/XRIsNoNI0cvtcyIS988DOfNVBQ9PtS-L',
        accounts:[process.env.REACT_APP_PRIVATE_KEY]
     } 
  },
  paths:{
    artifacts:'./src/artifacts',
  }
};
