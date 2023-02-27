const {expect}=require('chai');
const { ethers } = require('hardhat');

function toWei(value){
  return(ethers.utils.parseUnits(value.toString(),'ether'));
}

describe("Testing smart contract",()=>{

  let owner,acc1,acc2,acc3,deploy,contract;
  beforeEach(async()=>{

     [owner,acc1,acc2,acc3]=await ethers.getSigners();
     deploy=await ethers.getContractFactory("CrowdFund");
     contract=await deploy.deploy();

  });

  
  it("Creating a campaign",async()=>{
    const create1=await contract.connect(acc1).createCampaign("https://helppet.com","HelpPet",toWei(4),toWei(2));
    //console.log(create1);
    const create2=await contract.connect(acc2).createCampaign("https://savechild.com","SaveChild",toWei(4),toWei(2));
    //console.log(create2);
    const create3=await contract.connect(acc3).createCampaign("https://innovate.com","Innovate",toWei(6),toWei(2));
    //console.log(create3);
    const contribute1=await contract.contribute(2,{value:toWei(3)});
    await contribute1.wait();
    const txHash1=await contract.txHash(2,contribute1.hash,toWei(3));
    console.log(await contract.campaignDetail(2));

    const contribute2=await contract.contribute(2,{value:toWei(3)});
    await contribute2.wait();
    const txHash2=await contract.txHash(2,contribute2.hash,toWei(3));
    console.log(await contract.campaignDetail(2));

    const withdraw=await contract.connect(acc2).withdraw(2);
    console.log(withdraw);    

    
  })

  
})