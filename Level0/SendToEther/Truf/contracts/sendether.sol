// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract sendether{

    address public owner;
    constructor(){
        owner = msg.sender;
    }
    modifier onlyowner(){
        require(msg.sender == owner,"You r not the owner ");
        _;
    }

    function send(address payable to_sent) payable public {
        require(msg.sender.balance >=msg.value,"You  don't have the sufficient amount");

        to_sent.transfer(msg.value);
    }

    function chek_balance() view  public  onlyowner returns(uint){
        return msg.sender.balance;
    }
}