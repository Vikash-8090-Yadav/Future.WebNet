const { network, ethers } = require("hardhat")
const PRICE = ethers.utils.parseEther("0.1")
async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NFT_Marketplace")
    const basicNFT = await ethers.getContract("BasicNFT")
    console.log("Minting NFT.......")
    const mintTx = await basicNFT.mintNft()
    const mintRecipt = await mintTx.wait(1)
    const tokenId = mintRecipt.events[0].args.tokenId
    console.log("Approving An NFT")
    const approveTx = await basicNFT.approve(nftMarketplace.address, tokenId)
    await approveTx.wait(1)
    console.log("______ Approved ______")
    console.log("Listing an NFT.......")
    const tx = await nftMarketplace.list_item(basicNFT.address, tokenId, PRICE)
    await tx.wait(1)

    console.log("________ Listed NFT ________")
}

mintAndList()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
