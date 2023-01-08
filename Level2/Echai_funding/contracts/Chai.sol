// SPDX-License-Identifier: MIT

pragma solidity >= 0.5.0 <0.9.0;


 contract chai{
    // to store info of message sender
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    // storing all this peoples info in single array where each index targets to a persons transaction
    Memo[] memos;
    address payable public owner;

    constructor(){
        owner  = payable(msg.sender); //owner will be the one who deploys the contract and we are making it payable so that he can receive funds
    }

    // actual function with the help of which we can receive funds
    function buyChai(string memory name,string memory message ) public payable{
        require(msg.value>0,"Please pay something greater than 0");
        owner.transfer(msg.value); // will transfer donators money to smart contract owner
        memos.push(Memo(name,message,block.timestamp,msg.sender)); // now we will add that donator to our donators list
    }

    // you can get list of all donators and the total holdings of funds by this function on frontend
    function getMemos() public view returns(Memo[] memory ){
        return(memos);
    }
    function getBalance() public view returns(uint256){
        return owner.balance;
    }
}