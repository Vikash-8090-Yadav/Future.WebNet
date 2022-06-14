// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract sendeather{

    address public owner;
    constructor(){
        owner = msg.sender;
    }
    modifier onlyowner(){
        require(msg.sender == owner,"U r not the owner ");
        _;
    }

    function send(address payable to_sent) payable public {
        require(msg.sender.balance >=msg.value,"U have not the suffcinet amount");

        to_sent.transfer(msg.value);
    }

    function chek_balance() view  public  onlyowner returns(uint){
        return msg.sender.balance;
    }
}