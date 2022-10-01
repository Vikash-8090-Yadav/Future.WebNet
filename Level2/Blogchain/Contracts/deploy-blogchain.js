const hre = require("hardhat");

async function main() {
  const Blogchain = await hre.ethers.getContractFactory("Blogchain");
  const blogchain = await Blogchain.deploy(
    "Blogchain",
    "BLOG",
    "2500000000000000"
  );

  await blogchain.deployed();
  console.log(blogchain.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
