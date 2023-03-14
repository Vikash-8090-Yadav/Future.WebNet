import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
    itemBought as itemBoughtEvent,
    itemRemoved as itemRemovedEvent,
    itemListed as itemListedEvent,
} from "../generated/NFT_Marketplace/NFT_Marketplace"
import { itemListed, ActiveItem, itemBought, itemRemoved } from "../generated/schema"

export function handleitemListed(event: itemListedEvent): void {
    let ItemListed = itemListed.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    if (!ItemListed) {
        ItemListed = new itemListed(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    if (!activeItem) {
        activeItem = new ActiveItem(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    ItemListed.seller = event.params.seller
    activeItem.seller = event.params.seller

    ItemListed.nftAddress = event.params.nftAddress
    activeItem.nftAddress = event.params.nftAddress

    ItemListed.tokenId = event.params.tokenId
    activeItem.tokenId = event.params.tokenId

    ItemListed.Price = event.params.Price
    activeItem.price = event.params.Price

    activeItem.buyer = Address.fromString("0x0000000000000000000000000000000000000000")

    ItemListed.save()
    activeItem.save()
}

export function handleitemRemoved(event: itemRemovedEvent): void {
    let ItemRemoved = itemRemoved.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    if (!ItemRemoved) {
        ItemRemoved = new itemRemoved(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    ItemRemoved.seller = event.params.owner
    ItemRemoved.nftAddress = event.params.nftAddress
    ItemRemoved.tokenId = event.params.tokenId
    activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")

    ItemRemoved.save()
    activeItem!.save()
}

export function handleitemBought(event: itemBoughtEvent): void {
    let ItemBought = itemBought.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    if (!ItemBought) {
        ItemBought = new itemBought(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    ItemBought.buyer = event.params.buyer
    ItemBought.nftAddress = event.params.nftAddress
    ItemBought.tokenId = event.params.tokenId
    activeItem!.buyer = event.params.buyer

    ItemBought.save()
    activeItem!.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
    return tokenId.toHexString() + nftAddress.toHexString()
}
