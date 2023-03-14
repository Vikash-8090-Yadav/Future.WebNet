const { network } = require("hardhat")
const {
    developmentChains,
    networkConfig,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = []
    log("Deploying.........")
    const basicNft = await deploy("BasicNFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS,
    })
    console.log("Contract Deployed At ", basicNft.address)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying Contract.......")
        await verify(basicNft.address, args)
        log("Contract is Verified.")
    }
    log("__________")
}
module.exports.tags = ["all", "basicNft"]
