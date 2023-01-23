// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Web3fy is Ownable,ERC721URIStorage{

    uint public maxSupply;
    uint public totalSupply;
    struct Domain{
        string name; uint256 cost; bool isOwned;string txHash;
    }
    event Show(string  token);
    mapping (uint256=>Domain) public domains;

    string svg1=
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="650" height="500" viewBox="0 0 640 480" xml:space="preserve"><g transform="matrix(5.1 0 0 7.59 317.05 247.54)"  ><linearGradient id="SVGID_789" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 -45 -25)"  x1="0" y1="25" x2="90" y2="25"><stop offset="0%" style="stop-color:rgba(190, 90, 207, 1);"/><stop offset="100%" style="stop-color:rgba(0, 188, 255, 1);"/></linearGradient><rect style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: url(#SVGID_789); fill-rule: nonzero; opacity: 1;"  x="-45" y="-25" rx="0" ry="0" width="90" height="50" /></g><g transform="matrix(1 0 0 1 493.88 412.43)" style=""  ><text xml:space="preserve" font-family=" Open Sans, sans-serif" font-size="22" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-42.38" y="6.91" style="font-family: Cormorant Garamond, serif; fill: rgb(56,39,39); "> Web3Fy</tspan></text></g><g transform="matrix(1.27 0 0 1.27 331.29 237.84)" style=""  ><text xml:space="preserve" font-family="Open Sans, sans-serif" font-size="31" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 8; stroke-dasharray: 1 10; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-63.85" y="9.74" style="font-family: Oswald, sans-serif; "> ';
    string svg2='</tspan></text></g></svg>';

    

    constructor()ERC721("Web3fy", "FY"){
    }

    function list(string memory _name,uint256 _cost)public onlyOwner{
         maxSupply+=1;
         //domains[maxSupply]=Domain(_name,_cost,false);
         //domains[maxSupply]=Domain({name:_name,cost:_cost,isOwned:false});
         Domain storage item=domains[maxSupply];
         item.name=_name;
         item.cost=_cost;
         item.isOwned=false;
         
    }

    function getDomain(uint256 _id)public view returns(Domain memory){
        return domains[_id];
    }

    function mint(uint256 _id)public payable{
        require(domains[_id].isOwned==false);
        require(msg.value>=domains[_id].cost);
        domains[_id].isOwned=true;
        
        totalSupply++;
        _mint(msg.sender,_id);
        string memory svg3=string(abi.encodePacked(svg1,domains[_id].name,svg2));

        string memory createJson=Base64.encode(
              abi.encodePacked(
                '{"name": "',
                domains[_id].name,
                ' ", "description": "A domain name from web3fy", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(svg3)),
                '"}' 
            )
        );
        string memory tokenURI=string(abi.encodePacked("data:application/json;base64,",createJson));

        _setTokenURI(_id,tokenURI);
        emit Show(tokenURI);





    }
    function addTxHash(uint _id,string memory _txHash)public{
        domains[_id].txHash=_txHash;
    }

    function withdraw()public onlyOwner returns(bool){
        payable(msg.sender).transfer(address(this).balance);
        return(true);
    }
    
    function getBalance()public view returns(uint256){
        return(address(this).balance);
    }



}