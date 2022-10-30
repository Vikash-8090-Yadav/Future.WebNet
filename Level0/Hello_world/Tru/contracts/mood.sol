// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract moodDiary{
    string mood;
    function setmood( string memory _curentmood) public{
        mood = _curentmood;
    }

    function getmood() view public returns(string memory){
        return mood;
    }
}