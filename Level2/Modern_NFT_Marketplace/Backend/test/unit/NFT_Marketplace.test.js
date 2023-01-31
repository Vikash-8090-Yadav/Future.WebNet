const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkCofig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

// const ethers = require("ethers")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT Marketplace tests", () => {
          let deployer, player, nftMarketplace, basicNft
          const PRICE = ethers.utils.parseEther("0.1")
          let tokenId = 0
          const provider = ethers.getDefaultProvider()

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              //   player = (await getNamedAccounts()).player
              const accounts = await ethers.getSigners()
              //   deployer = accounts[0]
              player = accounts[1]
              await deployments.fixture(["all"])
              nftMarketplace = await ethers.getContract("NFT_Marketplace")
              basicNft = await ethers.getContract("BasicNFT")
              await basicNft.mintNft()
              await basicNft.approve(nftMarketplace.address, tokenId)
          })

          it("NFT can be listed and bought", async function () {
              await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
              const playerNftMarketplaceConnected = nftMarketplace.connect(player)
              await playerNftMarketplaceConnected.buyItem(basicNft.address, tokenId, {
                  value: PRICE,
              })
              const newOwner = await basicNft.ownerOf(tokenId)
              const deployerProceeds = await nftMarketplace.getProceeds(deployer)
              assert(newOwner.toString() == player.address.toString())
              assert(deployerProceeds.toString() == PRICE.toString())
          })

          describe("listItem", () => {
              it("reverts error when price is less than zero", async function () {
                  await expect(
                      nftMarketplace.list_item(
                          basicNft.address,
                          tokenId,
                          ethers.utils.parseEther("0")
                      )
                  ).to.be.revertedWith("NFT_Marketplace_Need_Amount_More_Than_Zero")
              })

              it("emits an event when item is listed", async function () {
                  expect(nftMarketplace.list_item(basicNft.address, tokenId, PRICE)).to.emit(
                      "itemListed"
                  )
              })
          })

          describe("buyItem", function () {
              it("reverts an error when there is insufficient balance in the buyer's account", async () => {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  const playerNftMarketplaceConnected = nftMarketplace.connect(player)
                  expect(
                      playerNftMarketplaceConnected.buyItem(basicNft.address, tokenId, {
                          value: ethers.utils.parseEther("0.01"),
                      })
                  ).to.be.revertedWith(
                      `NFT_Marketplace_Insufficient_Balance(${basicNft.address},${tokenId})`
                  )
              })
              it("emits an event when item is bought", async function () {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  const playerNftMarketplaceConnected = nftMarketplace.connect(player)
                  expect(
                      playerNftMarketplaceConnected.buyItem(basicNft.address, tokenId, {
                          value: PRICE,
                      })
                  ).to.emit("itemBought")
              })
          })

          describe("cancel_listing", function () {
              it("cancels listings", async () => {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  await nftMarketplace.cancel_listing(basicNft.address, tokenId)
                  const listing = await nftMarketplace.getListings(basicNft.address, tokenId)
                  assert(listing.price.toString() == "0")
              })

              it("emits an event when item is cancelled", async function () {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  expect(await nftMarketplace.cancel_listing(basicNft.address, tokenId)).to.emit(
                      "itemRemoved"
                  )
              })
          })

          describe("update_listing", () => {
              it("reverts an error when new price is less than or equal to zero", async function () {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  const newprice = ethers.utils.parseEther("0")
                  expect(
                      nftMarketplace.update_listing(basicNft.address, tokenId, newprice)
                  ).to.be.revertedWith(
                      `NFT_Marketplace_Update_Price_GreaterThanZero(${basicNft.address},${tokenId},${newprice})`
                  )
              })

              it("updates the price of the listing", async function () {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  const newprice = ethers.utils.parseEther("0.2")
                  await nftMarketplace.update_listing(basicNft.address, tokenId, newprice)
                  const updatedPrice = await nftMarketplace.getListings(basicNft.address, tokenId)
                  assert(updatedPrice.price.toString() == newprice.toString())
                  expect().to.emit("itemListed")
              })
          })
          describe("withdraw", function () {
              it("reverts an error when there is no proceeds", async () => {
                  expect(nftMarketplace.withdraw(basicNft.address, tokenId)).to.be.revertedWith(
                      "NFT_Marketplace_No_Proceeds"
                  )
              })
              it("Amount can be easily withdrawn", async function () {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  const deployerBalanceBefore = await provider.getBalance(deployer)

                  const user = nftMarketplace.connect(player)
                  await user.buyItem(basicNft.address, tokenId, {
                      value: PRICE,
                  })
                  const proceeds = await nftMarketplace.getProceeds(deployer.address)
                  assert(proceeds.toString() == PRICE.toString())
                  const transactionResponse = await nftMarketplace.withdraw(
                      basicNft.address,
                      tokenId
                  )
                  const transactionRecipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionRecipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)
                  const deployerBalanceAfter = await provider.getBalance(deployer)
                  const deployerBalanceAfterInEther = ethers.utils.formatEther(
                      deployerBalanceAfter
                  )
                  console.log(`Balance of ${deployer} is: ${deployerBalanceAfterInEther} ether`)
                  assert(
                      deployerBalanceBefore.add(proceeds).toString() ==
                          deployerBalanceAfter.add(gasCost).toString()
                  )
              })
          })
      })
