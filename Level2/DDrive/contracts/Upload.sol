// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract Upload{


    //So that Owner of particular files can shre there resouces to other address. (Giving Access)
    struct Access{
        address user; // The person who want access
        bool access; // He has the Access to files or not?
    }

    // Every address wil be mapped with array of strings in which string will have his url for the file he uploaded so multiple files need to be stored with array of strings
    mapping(address => string[]) value;

    // Mapping of array of Access(struct) with the address(owner) so suppose a owner upload multiple files and he gives access to user(x) then that user x will have access to all files which has been uploaded by owner
    mapping(address=>Access[]) accessList;

    // Nested mapping of owners address to the users addresses who have access to the files of that particular owner in value of true or false 
     mapping(address=>mapping(address => bool)) ownerShip;

    // Previous state information cache hey bhai
    mapping(address=>mapping(address=>bool)) previousData;

    // this function will be used when a user wants to upload his data 
    function add(address _user, string memory url) external {
        value[_user].push(url); // will add the files to the ipfs 
    }

    // Owner can give access to his files by using this function he just have to pass address of that user
    function allow(address user) external{
        ownerShip[msg.sender][user] = true; // will be stored in 2d array 
        if(previousData[msg.sender][user]){
            for(uint i=0; i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access = true; // will store which user have access to the data
                }
            }
        }else{
            accessList[msg.sender].push(Access(user,true)); // will store which user have access to the data
            previousData[msg.sender][user] = true;
        }
        
    }

    // This function will remove the access of the files
    function disallow(address user) public{
        ownerShip[msg.sender][user] = false;
        for(uint i = 0 ; i < accessList[msg.sender].length ;i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    // Will display all images by returning urls of that on frontend
   function display(address _user) external view returns(string[] memory){
       require(_user == msg.sender || ownerShip[_user][msg.sender],"You dont have access ");
       return value[_user];
   }

   // To fetch the list of pepole who has access to files will be used by owner
   function shareAccess() public view returns(Access[] memory){
       return accessList[msg.sender];
   }
}