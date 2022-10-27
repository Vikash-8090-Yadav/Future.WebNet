// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GemMine {
    function checkStatus() public pure returns (string memory) {
        return "Mine is Working With 100% Accuracy";
    }

    mapping(uint256 => Mine) mines;
    uint256 public counter = 0;

    struct Mine {
        uint256 id;
        string location;
    }

    function addMine(string memory location) public {
        counter += 1;
        mines[counter] = Mine(counter, location);
    }

    function getLocation(uint256 id) public view returns (uint256 mineID, string memory location) {
        return (mines[id].id, mines[id].location);
    }
}