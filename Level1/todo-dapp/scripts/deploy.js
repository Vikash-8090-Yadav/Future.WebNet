const hre = require("hardhat");

async function main() {
  const Manager = await hre.ethers.getContractFactory("Manager");
  const manager = await Manager.deploy();

  await manager.deployed();

  console.log("Manager deployed to:", manager.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Contract Address - 0xc206bCE86e806F911CB9225D232eE130Da0a1D77