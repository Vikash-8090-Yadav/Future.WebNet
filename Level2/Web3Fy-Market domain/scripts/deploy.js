// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

async function main() {


  
   const contract=await ethers.getContractFactory("Web3fy");
   const deploy=await contract.deploy();
   await deploy.deployed();
   console.log("Contract address",deploy.address);

  const names = ["ethdaddy.fy", "openweb.fy", "uiove.fy", "corion.fy", "tokenizer.fy", "hreoku.fy"]
  const costs = [tokens(0.1), tokens(0.25), tokens(0.15), tokens(0.25), tokens(0.3), tokens(0.1)]

  for(let i=0;i<costs.length;i++){
    const listItems=await deploy.list(names[i],costs[i]);
    console.log("Item address ",(i+1));
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
