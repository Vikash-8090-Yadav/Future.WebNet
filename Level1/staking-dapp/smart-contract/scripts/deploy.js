const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

  const Staking = await hre.ethers.getContractFactory('Staking');

  const staking = await Staking.deploy({
    value: ethers.utils.parseEther('0.2')
  })

  await staking.deployed();

  console.log(`Staking contract deployed to ${staking.address}`);

  /*const provider = waffle.provider;
  let data;
  let transaction;
  let receipt;
  let block;
  let newUnlockDate;

  data = { value: ethers.utils.parseEther('0.01') }
  transaction = await staking.connect(signer2).stakeMatic(30, data);

  data = { value: ethers.utils.parseEther('0.015') }
  transaction = await staking.connect(signer2).stakeMatic(180, data);

  data = { value: ethers.utils.parseEther('0.1') }
  transaction = await staking.connect(signer2).stakeMatic(180, data);

  data = { value: ethers.utils.parseEther('0.03') }
  transaction = await staking.connect(signer2).stakeMatic(90, data);
  receipt = await transaction.wait();
  block = await provider.getBlock(receipt.blockNumber);
  newUnlockDate = block.timestamp - (60 * 60 * 24 * 1000);
  await staking.connect(signer1).changeUnlockPeriod(3, newUnlockDate);

  data = { value: ethers.utils.parseEther('0.12') }
  transaction = await staking.connect(signer2).stakeMatic(180, data);
  receipt = await transaction.wait();
  block = await provider.getBlock(receipt.blockNumber);
  newUnlockDate = block.timestamp - (60 * 60 * 24 * 1000);
  await staking.connect(signer1).changeUnlockPeriod(4, newUnlockDate);*/

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Contract Address = 0x12163B070B97f06F5061D93164D960bbFCfdf965