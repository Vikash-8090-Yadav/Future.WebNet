// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract vote{
    string public winner;
    address public  participant1 = 0xF6C486B8A4e67b8eff4d5045C804E9be4ed39FF9;
    address public  participant2 = 0xBBDb2A08711D7b2b9c15318E77B6e026eD8fA278;
    mapping(address=>uint) user;
    mapping(address=>bool) chek;

    address public owner;
    constructor(){
        owner = msg.sender;
    }

    modifier onlyonwner(){
        require(msg.sender == owner,"You are not allowed to declare the result");
        _;
    }

    function participant1_vote()  public {
        require(msg.sender !=participant1,"You can not vote to yourself");
        require(chek[msg.sender]!=true,"You have already voted");
        user[participant1]++;
        chek[msg.sender] = true;
    }
        function participant2_vote()  public {
        require(msg.sender !=participant2,"You can not vote to yourself");
        require(chek[msg.sender]!=true,"You have already voted");
        user[participant2]+=1;
        chek[msg.sender] = true;
    }

    function pati1_cnt_VOTE() view public onlyonwner returns(uint){
        return user[participant1];

    }

    function pati2_cnt_VOTE() view public onlyonwner returns(uint){
        return user[participant2];

    }

    function declare_winner()  public  onlyonwner {
        if(user[participant1]>user[participant2]){
            winner = "Candidate 1 is winner";
        }
        else if(user[participant1]==user[participant2]){
            winner = "Draw";
        }
        else{
            winner = "Candidate 2 is winner";
        }
    }

}