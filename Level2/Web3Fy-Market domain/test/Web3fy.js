const { expect } = require("chai");
const { ethers } = require("hardhat");
//in every it block contract needs to be deployed

const tokens = (n) => {
  const amt=ethers.utils.parseUnits(n.toString(), 'ether');
  console.log(amt);
  return amt;//ethers to wei
}
describe("Testing Web3fy",()=>{
  let owner,acc1,acc2;
  let contract,deploy;
  
  beforeEach(async()=>{
      [owner,acc1,acc2]=await ethers.getSigners();
      contract=await ethers.getContractFactory("Web3fy");
      deploy=await contract.deploy();
      
      
});
   describe("Testing contract",()=>{

        it("Test for name",async()=>{
          
            expect(await deploy.name()).to.equal("Web3fy");
        });
        it("Check Owner",async()=>{
            console.log(await deploy.owner());
        });
        it("Check Max Supply",async()=>{
            console.log(await deploy.maxSupply());
        });
        

   });
     
    describe("Listing items",()=>{

      it("List items",async()=>{
        //await deploy.connect(acc1).list("envy.com.in",tokens(0.32))
        await deploy.list("envy.com.in",tokens(0.32))
        await deploy.list("daddy.com.in",tokens(10))

        const [name,cost,check]=await deploy.getDomain(1);
        
        expect(await deploy.connect(acc1).maxSupply()).to.equal(2);
        console.log(ethers.utils.formatEther(cost));
        await deploy.connect(acc2).mint(1,{value:tokens(0.35)});
        expect(await deploy.connect(acc1).totalSupply()).to.equal(1);
      });

     

    })
  
})

