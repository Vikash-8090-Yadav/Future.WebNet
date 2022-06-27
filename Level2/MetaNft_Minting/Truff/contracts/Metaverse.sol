// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// Openzeppelin imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract Metaverse is ERC721,Ownable {
    constructor() ERC721 ("META","MTA"){}

    using Counters for Counters.Counter;

    Counters.Counter private supply;

    uint public maxMinting = 100;

    uint public cost = 1 wei;

    struct Object {
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }
    mapping (address=>Object[]) NFTOwners;
    Object[] public objects;

    function getObjects() public view returns(Object[] memory){
        return objects;
    }

    function totalMint() public view returns(uint){
        return supply.current();
    }

    function mint(string memory _object_name,int8 _w,int8 _h,int8 _d,int8 _x,int8 _y,int8 _z) public payable{
        require(supply.current()<=maxMinting,"Supply exceeds maximum");
        require(msg.value>=cost,"Insufficient Payment");
        supply.increment();
        _safeMint(msg.sender,supply.current());
        Object memory _newObject = Object(_object_name,_w,_h,_d,_x,_y,_z);
        objects.push(_newObject);
        NFTOwners[msg.sender].push(_newObject);
    }

    function withdraw() external payable onlyOwner{
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function getOwnerObjects() public view returns(Object[] memory){
        return NFTOwners[msg.sender];
    }
}