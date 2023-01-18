// for refferecnce go to deploy.js where we have written test cases

const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});