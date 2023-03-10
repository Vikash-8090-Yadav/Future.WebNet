const { network } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = []
    console.log("Deploying Contract.........")

    const nftMarketplace = await deploy("NFT_Marketplace", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS,
    })

    console.log("Contract Deployed At ", nftMarketplace.address)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying..........")
        await verify(nftMarketplace.address, args)
    }
    log("_______________")
}

module.exports.tags = ["all", "nftMarketplace"]
