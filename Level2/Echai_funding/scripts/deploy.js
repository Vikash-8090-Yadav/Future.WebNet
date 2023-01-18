// for testing
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { BigNumber } = require("ethers");
const hre = require("hardhat");


const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

// this function will provide the balance of the particular address
async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address); //
  return hre.ethers.utils.formatEther(balanceBigInt);
}


// To get balances of each address from addresses array
async function consolBalances(addresses){
  let counter =0;
  for(const address of addresses ){
    console.log(`Address ${counter} Balance:`, await getBalances(address));
    counter++;
  }
}

// this function will give info of donatos by traversing memos array
async function consolMemos(memos){
  for (const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp} ${name} named guy having address ${from} delivered funds with ${message}`);
    
  }
}



async function main() {
  
  const [owner, from1, from2 , from3] =  await hre.ethers.getSigners();// will get address of contract signers
  const chai = await hre.ethers.getContractFactory("chai"); 
  const contract = await chai.deploy(); // creating instance of contract

  await contract.deployed();
  console.log("Address of contract : ", contract.address); // gives contract address

  const addresses = [owner.address,from1.address, from2.address,from3.address]; // getting all addresses in array structure
 
  console.log("before buying chai"); // checking all parameters before buying coffee 
  await consolBalances(addresses); // this function does all work

  const amount = {value:hre.ethers.utils.parseEther("1")}; // amount to be transfered
  await contract.connect(from1).buyChai("from1","very nice chai",amount); // paassing this amount from user 1
  await contract.connect(from2).buyChai("from2","very nice course",amount);  // paassing this amount from user 2
  await contract.connect(from3).buyChai("from3","very nice ",amount); // paassing this amount from user 3

  console.log("After buying chai"); // checking all parameters after buting coffee
  await consolBalances(addresses); // this function does all work

  const balance = await contract.getBalance();
  console.log("Dapp has total = ",balance);

  const memos = await contract.getMemos();
  consolMemos(memos);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
