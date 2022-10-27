// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GemMine {
    // Function To check if the Mine is Active
    function checkStatus() public pure returns (string memory) {
        return "Mine is Working With 100% Accuracy";
    }

    // Create a Mapping from uint to Mine Structure
    mapping(uint256 => Mine) mines;
    // Counter to keep track of mines
    uint256 public counter = 0;

    // Create a Structure Mine to store mine id and location
    struct Mine {
        uint256 id;
        string location;
    }

    // Function to add new Mine
    function addMine(string memory location) public {
        counter += 1;
        mines[counter] = Mine(counter, location);
    }

    // Function to retrieve Mine Location
    function getLocation(uint256 id) public view returns (uint256 mineID, string memory location) {
        return (mines[id].id, mines[id].location);
    }
}