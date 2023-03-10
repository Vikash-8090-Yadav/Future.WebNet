// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error NFT_Marketplace_Need_Amount_More_Than_Zero();
error NFT_Marketplace_NFT_IS_NOT_APPROVED_TO_MARKETPLACE();
error NFT_Marketplace_Already_Listed();
error NFT_Marketplace_Not_Owner();
error NFT_Marketplace_Not_Listed(address nftAddress,uint256 tokenId);
error NFT_Marketplace_Insufficient_Balance(address nftAddress, uint256 tokenId);
error NFT_Marketplace_Update_Price_GreaterThanZero(address nftAddress,uint256 tokenId,uint256 price);
error NFT_Marketplace_Transfer_Failed();
error  NFT_Marketplace_No_Proceeds();
// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract NFT_Marketplace is ReentrancyGuard {

//Events
event itemListed(address indexed seller, address indexed nftAddress, uint256 indexed tokenId,uint256 Price);
event itemBought(address indexed buyer,address indexed nftAddress, uint256 indexed tokenId,uint256 price);
event itemRemoved(address indexed owner,address indexed nftAddress,uint256 indexed tokenId);

struct Listing{
uint256 price;
address seller;
}
// NFT Address -> token_id -> Listing (price, seller)
mapping(address => mapping(uint256 => Listing)) private s_listings;

// Owner's Address -> Withdrawable balance of the owner 
mapping(address => uint256) private s_proceeds;

// Modifiers

modifier notListed(address nftAddress,uint256 tokenId,address owner) {
Listing memory listing = s_listings[nftAddress][tokenId];
if(listing.price != 0){
    revert NFT_Marketplace_Already_Listed();
}
_;
}

modifier isOwner(address nftAddress,uint256 tokenId,address spender) {
IERC721 nft = IERC721(nftAddress);
address owner  = nft.ownerOf(tokenId);
if(owner != spender){
    revert NFT_Marketplace_Not_Owner();
}
_;
}

modifier isListed(address nftAddress,uint256 tokenId){
Listing memory listing = s_listings[nftAddress][tokenId];
if (listing.price <= 0) {
    revert NFT_Marketplace_Not_Listed(nftAddress,tokenId);
}
_;
}


// Main Functions

function list_item(address nft_address,uint256 token_id, uint256 price) external notListed(nft_address,token_id,msg.sender) isOwner(nft_address,token_id, msg.sender) {
if(price <=0){
    revert NFT_Marketplace_Need_Amount_More_Than_Zero();
}

IERC721 nft = IERC721(nft_address);

if(nft.getApproved(token_id) != address(this)){
revert NFT_Marketplace_NFT_IS_NOT_APPROVED_TO_MARKETPLACE();
}

s_listings[nft_address][token_id] = Listing(price,msg.sender);
emit itemListed(msg.sender,nft_address,token_id,price);

}


function buyItem(address nft_address,uint256 token_id) external payable isListed(nft_address,token_id)
nonReentrant
{
Listing memory listing = s_listings[nft_address][token_id];

// Transfering NFT To The Buyer From The Seller
if(msg.value < listing.price){
    revert NFT_Marketplace_Insufficient_Balance(nft_address,token_id);
}
s_proceeds[listing.seller] = s_proceeds[listing.seller] + msg.value;
delete (s_listings[nft_address][token_id]);
IERC721(nft_address).safeTransferFrom(listing.seller,msg.sender,token_id);
emit itemBought(listing.seller,nft_address,token_id,listing.price);

}


function cancel_listing(address nft_address,uint256 token_id) external  isOwner(nft_address,token_id,msg.sender) isListed(nft_address,token_id){
delete (s_listings[nft_address][token_id]);
emit itemRemoved(msg.sender,nft_address,token_id);
}

function update_listing(address nft_address,uint256 token_id,uint256 new_price) isOwner(nft_address,token_id,msg.sender) isListed(nft_address,token_id) external {
if(new_price <= 0){
    revert NFT_Marketplace_Update_Price_GreaterThanZero(nft_address,token_id,new_price);
}
s_listings[nft_address][token_id].price = new_price;
emit itemListed(msg.sender,nft_address,token_id,new_price);
}


function withdraw() external {
    uint256 proceeds = s_proceeds[msg.sender];
    if(proceeds <=0){
        revert NFT_Marketplace_No_Proceeds();
    }
s_proceeds[msg.sender] = 0;
(bool success,) = payable(msg.sender).call{value:proceeds}("");

if(!success){
    revert NFT_Marketplace_Transfer_Failed();
}

}

// Getter Functions

function getListings(address nft_address,uint256 token_id) external view returns(Listing memory) {
return s_listings[nft_address][token_id];
}


function getProceeds(address seller) external view returns(uint256){
return s_proceeds[seller];
}

// list_item ☑️
// update_price ☑️
// cancel_listing ☑️
// withdraw processing ☑️
// buy_item ☑️


}
