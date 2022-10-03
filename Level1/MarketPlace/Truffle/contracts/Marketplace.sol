// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct selling_item{
    string Name;
    uint   Id;
    uint   Cost;
    uint   Time;
}

contract Marketplace{
    string[] buyer;
    mapping(uint=>string) itemlist;
    selling_item[] public  seling_items;
    address public seller;
    mapping(uint=>uint) public cost;
    constructor(){
        seller = msg.sender;
    }

    modifier onlyonwner(){
        require(seller == msg.sender,"You are not allowed to do this ");
        _;
    }

    function AllItem(uint _Id, string memory _Name ,uint _Cost)  public onlyonwner{
        itemlist[_Id] =_Name;
        cost[_Id] = _Cost;
        seling_items.push(selling_item(_Name,_Id,_Cost,block.timestamp));
    }

    function buy(uint _Id)  public payable{
        uint n = cost[_Id];
        uint cost_eather=(n*10**18);
        require(cost_eather ==msg.value,"Less sufficent amount");
        buyer.push(itemlist[_Id]);
    }
    function view_item() view  public returns(string[]memory){
        return buyer;
    }


}