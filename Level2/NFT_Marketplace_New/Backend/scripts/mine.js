const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const BLOCKS = 5
const SLEEP_AMOUNT = 1000
async function mine() {
    await moveBlocks(BLOCKS, (sleepAmount = SLEEP_AMOUNT))
}

mine()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
