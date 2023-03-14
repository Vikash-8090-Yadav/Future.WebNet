import React, { useState } from "react"
import { Modal, Input, useNotification } from "web3uikit"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import { ethers } from "ethers"

const UpdateListingModal = ({ isVisible, tokenId, nftMarketplaceAddress, nftAddress, onClose }) => {
    const [priceToUpdateTheListing, setPriceToUpdateTheListing] = useState("0")
    const dispatch = useNotification()
    const { runContractFunction: update_listing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: nftMarketplaceAddress,
        functionName: "update_listing",
        params: {
            nft_address: nftAddress,
            token_id: tokenId,
            new_price: ethers.utils.parseEther(priceToUpdateTheListing || "0"),
        },
    })

    const handleUpdatedListing = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            title: "Listing Updated",
            message: "Listng Updated, please refresh (and move blocks)",
            position: "topR",
        })
        onClose && onClose()
        setPriceToUpdateTheListing("0")
    }

    return (
        <div>
            <Modal
                id="regular"
                isVisible={isVisible}
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                onOk={() => {
                    console.log("clicked")
                    console.log(nftAddress, tokenId, priceToUpdateTheListing)
                    update_listing({
                        onError: (error) => console.log(error),
                        onSuccess: handleUpdatedListing,
                    })
                }}
                title={"Update Listing Price"}
            >
                <Input
                    label="Update Listing Price"
                    placeholder="Enter the price in L1 currency (in ETH)"
                    name="New Price Of The Lisiting"
                    type="number"
                    onChange={(event) => {
                        setPriceToUpdateTheListing(event.target.value)
                    }}

                    // width="100%"
                />
            </Modal>
        </div>
    )
}

export default UpdateListingModal
