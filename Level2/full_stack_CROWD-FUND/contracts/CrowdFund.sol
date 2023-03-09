// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CrowdFund is ERC721URIStorage{

    uint public noCampaigns;
    string public hello="Hello to Contract";
    struct Transaction{
          address sender;
          string  txHash;
          uint amount;
    }
    struct Campaign{
        string url;
        string campaign;
        address owner;
        uint target;
        bool isAchieved;
        uint amtRaised;
        uint amtNFT;
        uint8 noContribution;
        Transaction[] transactions;
    }
    mapping(uint256=>Campaign) public campaigns;
    
    string svg1='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1080" height="1080" viewBox="0 0 1080 1080" xml:space="preserve"><g transform="matrix(1 0 0 1 540 540)" id="1ec42d92-dcda-487a-b8a4-25f4a2a089bb" ></g><g transform="matrix(1 0 0 1 540 540)" id="f940d891-615c-4228-9ffc-e3c29a030799"  ><rect style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(68,169,172); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  x="-540" y="-540" rx="0" ry="0" width="1080" height="1080" /></g><g transform="matrix(1 0 0 1 540 487.38)" style="" id="ffa4e6a6-e032-4b5c-880f-d18c567a939e"  ><text xml:space="preserve" font-family="Alegreya" font-size="80" font-style="normal" font-weight="900" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(16,50,111); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-55" y="25.13" >#';
    string svg2='</tspan></text></g><g transform="matrix(1 0 0 1 227.1 115.51)" style="" id="12896941-4cdb-491b-b001-cbaf373299e4"  ><text xml:space="preserve" font-family="Alegreya" font-size="80" font-style="normal" font-weight="700" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(218,232,230); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-169.6" y="25.13" >';
    string svg3='</tspan></text></g><g transform="matrix(1 0 0 1 729.08 946.89)" style="" id="a1b0ad8b-f4db-452d-93a8-c1db4a77bf5f"  ><text xml:space="preserve" font-family="Alegreya" font-size="80" font-style="normal" font-weight="700" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(28,70,47); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-230.52" y="25.13" >*CrowdFund*</tspan></text></g></svg>';
    
    constructor()ERC721("CrowdFund","CF"){
        
    }
    function createCampaign(string memory _url,string memory _name,uint _target,uint _amtNFT)public returns(uint256){
       noCampaigns++;
       Campaign storage newCampaign=campaigns[noCampaigns];
       newCampaign.url=_url;newCampaign.campaign=_name;
       newCampaign.owner=msg.sender;newCampaign.target=_target;
       newCampaign.isAchieved=false;newCampaign.amtNFT=_amtNFT;
       return noCampaigns;
    }
    function contribute(uint _id)public payable{
        require(msg.value>0,"Have to contribute some ETH");
        
        Campaign storage newCampaign=campaigns[_id];
        newCampaign.noContribution+=1;
         if(msg.value >= newCampaign.amtNFT){
               
               _mint(msg.sender,newCampaign.noContribution);
               string memory svg4=string(abi.encodePacked(svg1,Strings.toString(newCampaign.noContribution),svg2));
               string memory svg5=string(abi.encodePacked(svg4,newCampaign.campaign,svg3));
               string memory metaData=Base64.encode(abi.encodePacked(
               '  {"name":"Rainbow Token"  ,',
               ' "description":"A special token your cause to support us"  ,',
               '  "image": "data:image/svg+xml;base64, ',
               Base64.encode(bytes(svg5)),' "} '

               ));
               string memory tokenURI=string(abi.encodePacked("data:application/json;base64,",metaData));
               _setTokenURI(newCampaign.noContribution,tokenURI);
          }
        newCampaign.amtRaised+=msg.value ;
        if(newCampaign.amtRaised>=newCampaign.target){
            newCampaign.isAchieved=true;
        }


    }
    function txHash(uint _id,string memory _txHash,uint _amt)public{
        Campaign storage newCampaign=campaigns[_id];
        newCampaign.transactions.push(Transaction(msg.sender,_txHash,_amt));
    }
    function campaignDetail(uint _id)public view returns(Campaign memory){

        return(campaigns[_id]);
    }
    function showTransactions(uint _id)public view returns(Transaction[] memory ){
          return(campaigns[_id].transactions);
    }
    function withdraw(uint _id)public{
          require(campaigns[_id].owner==msg.sender,"Not the owner");
          campaigns[_id].isAchieved=true;
          payable(msg.sender).transfer(campaigns[_id].amtRaised);
     }
    function getCamp()public view  returns(uint256){
        return noCampaigns;
    }
}