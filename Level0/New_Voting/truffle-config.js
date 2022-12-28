require('dotenv').config({path : '/.env'})
const HDWalletProvider = require('@truffle/hdwallet-provider');
module.exports = {
  networks: {
    
    matic:{
      provider :()=> new HDWalletProvider(process.env.menemoic, process.env.uri),
      network_id :80001,
      confirmations : 2,
      timeoutBlocks :2000,
      skipDryRun : true

     },

    
  },
// },
  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

};
