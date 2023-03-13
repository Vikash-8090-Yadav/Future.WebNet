import React from "react"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import Image from "next/image"
import { Card, useNotification } from "web3uikit"
import { ethers } from "ethers"
import nftAbi from "../constants/BasicNft.json"
import UpdateListingModal from "./UpdateListingModal"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import marketPlaceAddress from "../constants/networkMapping.json"

// import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import Moralis from "moralis"

// import { EvmChain } from "@moralisweb3/evm-utils"
const NFTBox = ({ price, tokenId, nftAddress, seller, proceeds }) => {
    const { chainId } = useMoralis()
    console.log(chainId)
    const chainString = chainId ? parseInt(chainId).toString() : null
    const nftMarketplaceAddress = chainId ? marketPlaceAddress[chainString].NftMarketplace[0] : null

    console.log(nftMarketplaceAddress)
    const [imageURI, setImageURI] = useState("")
    const dispatch = useNotification()
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const { isWeb3Enabled, account } = useMoralis()
    // const Moralis = require("moralis").default
    // const { EvmChain } = require("@moralisweb3/common-evm-utils")
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })
    async function updateUI() {
        const tokenURI = await getTokenURI()
        console.log(`The TokenURI is ${tokenURI}`)
        // We are going to cheat a little here...
        if (tokenURI) {
            // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageURIURL)
            // console.log(tokenURIResponse)
            setTokenDescription(tokenURIResponse.description)
            setTokenName(tokenURIResponse.name)
        }
    }
    const isOwner = seller == account || seller == undefined

    const formattedSellerAddress = isOwner ? "you" : seller

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const { runContractFunction: buy_item } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: nftMarketplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nft_address: nftAddress,
            token_id: tokenId,
        },
    })

    const handleBuyItem = () => {
        // await tx.wait(1)
        dispatch({
            type: "success",
            title: "Item Bought",
            message: "Listng Bought, please refresh (and move blocks)",
            position: "topR",
        })
        proceeds = ethers.formatUnits(price, "eth")
        // onClose && onClose()
        // setPriceToUpdateTheListing("0")
    }

    const [isVisible, setIsVisble] = useState(false)
    function showModal() {
        isOwner
            ? setIsVisble(true)
            : buy_item({
                  onError: (error) => console.log(error),
                  onSuccess: () => handleBuyItem(),
              })
    }
    const hideModal = () => setIsVisble(false)
    return (
        <div>
            <div className="p-4 w-2xl">
                <div className="p-2">
                    {imageURI ? (
                        <div>
                            <UpdateListingModal
                                isVisible={isVisible}
                                nftAddress={nftAddress}
                                nftMarketplaceAddress={nftMarketplaceAddress}
                                tokenId={tokenId}
                                onClose={hideModal}
                            />
                            <Card
                                title={tokenName}
                                description={tokenDescription}
                                onClick={showModal}
                            >
                                <div className="m-2 flex flex-col gap-1 justify-center items-end">
                                    #{tokenId}
                                    <div className="italic text-sm">
                                        Owned By {formattedSellerAddress}
                                    </div>
                                    <div>
                                        <Image
                                            loader={() => imageURI}
                                            src={imageURI}
                                            height="200"
                                            unoptimized={true}
                                            width="200"
                                            alt="Dogie"
                                        />
                                    </div>
                                    <div className="font-bold text-left">
                                        {ethers.utils.formatUnits(price, "ether")} ETH
                                    </div>
                                    {nftAddress}
                                </div>
                            </Card>
                        </div>
                    ) : (
                        "Loading..."
                    )}
                </div>

                {/* <div>Loading</div> */}
            </div>
            <br />
            <br />
        </div>
    )
}

export default NFTBox
