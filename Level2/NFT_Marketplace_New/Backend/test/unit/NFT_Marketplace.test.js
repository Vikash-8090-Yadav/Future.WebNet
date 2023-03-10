const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkCofig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")
const { equal } = require("assert")

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
              it("reverts an error when the NFT is already listed", async () => {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  expect(
                      nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  ).to.be.revertedWith("NFT_Marketplace_Already_Listed()")
              })
              it("only owner can lists their NFTs", async () => {
                  const playerWalletConnection = await nftMarketplace.connect(player)
                  expect(
                      playerWalletConnection.list_item(basicNft.address, tokenId, PRICE)
                  ).to.be.revertedWith("NFT_Marketplace_Not_Owner()")
              })

              it("reverts an error when it is not Approved", async () => {
                  expect(nftMarketplace.list_item(basicNft.address, 2, PRICE)).to.be.revertedWith(
                      "NFT_Marketplace_NFT_IS_NOT_APPROVED_TO_MARKETPLACE()"
                  )
              })
              it("reverts an error when price of the NFT is less than or equal to zero", async () => {
                  expect(
                      nftMarketplace.list_item(
                          basicNft.address,
                          tokenId,
                          ethers.utils.parseEther("-1")
                      )
                  ).to.be.revertedWith(
                      `NFT_Marketplace_Not_Listed(${basicNft.address},${tokenId})`
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

              it("withdraw function works perfectly", async () => {
                  await nftMarketplace.list_item(basicNft.address, tokenId, PRICE)
                  expect(nftMarketplace.withdraw()).to.be.revertedWith(
                      "NFT_Marketplace_No_Proceeds()"
                  )
                  const playerNftMarketplaceConnected = nftMarketplace.connect(player)
                  await playerNftMarketplaceConnected.buyItem(basicNft.address, tokenId, {
                      value: PRICE,
                  })

                  const proceeds = await nftMarketplace.getProceeds(deployer)
                  expect(equal(await proceeds.toString(), PRICE.toString()))

                  const owner = await basicNft.ownerOf(tokenId)
                  //   console.log(owner)
                  //   console.log(player.address)
                  //   console.log(deployer)
                  //   await nftMarketplace.connect(deployer)
                  await nftMarketplace.withdraw()
                  const laterProceeds = await nftMarketplace.getProceeds(deployer)

                  expect(equal(laterProceeds, "0"))
              })
          })

          describe("basicNFT", function () {
              it("owner of nft is correct", async () => {
                  const owner = await basicNft.ownerOf(tokenId)
                  expect(equal(owner.toString(), deployer))
              })

              it("NFT name and symbol are correct", async () => {
                  const name = await basicNft.name()
                  const symbol = await basicNft.symbol()
                  assert(name.toString() === "Dogie")
                  assert(symbol.toString() === "DOG")
              })
              it("reverts an error when token_id is incorrect", async () => {
                  expect(basicNft.tokenURI(2)).to.revertedWith(
                      "ERC721Metadata: URI query for nonexistent token"
                  )
              })

              it("token_counter works properly", async () => {
                  const beforeTokenCounter = await basicNft.getTokenCounter()
                  expect(equal(beforeTokenCounter.toString(), "1"))
                  await basicNft.mintNft()
                  const afterTokenCounter = await basicNft.getTokenCounter()
                  expect(equal(afterTokenCounter.toString(), "2"))
              })
          })
      })
