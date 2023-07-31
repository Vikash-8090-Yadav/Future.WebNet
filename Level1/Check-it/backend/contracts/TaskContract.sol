// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
 // task: { id: 0, taskText: 'clean', isDeleted: false },

contract TaskContract {
  event AddTask(address recipient, uint taskId);
  event DeleteTask(uint taskId, bool isDeleted);

  struct Task {
    uint id;
    string taskText;
    bool isDeleted;
  }

  Task[] private tasks;
  mapping(uint256 => address) taskToOwner;
 
  function addTask(string memory taskText, bool isDeleted)
external{
    uint taskId=tasks.length;
    tasks.push(Task(taskId, taskText, isDeleted));
    taskToOwner[taskId]= msg.sender;
    emit AddTask(msg.sender, taskId);

  }

  function getMyTasks() external view returns (Task[] memory) {
    Task[] memory temporary = new Task[](tasks.length);
    uint counter = 0;

    for (uint i = 0; i < tasks.length; i++) {
        if (taskToOwner[i] == msg.sender && !tasks[i].isDeleted) {
            // Check if the counter is less than the temporary array's length
            if (counter < temporary.length) {
                temporary[counter] = tasks[i];
            } else {
                // If the counter exceeds the temporary array's length, exit the loop
                break;
            }
            counter++;
        }
    }

    // Create the result array with the actual size (counter)
    Task[] memory result = new Task[](counter);
    for (uint i = 0; i < counter; i++) {
        result[i] = temporary[i];
    }
    return result;
}


  function deleteTask(uint taskId, bool isDeleted) external {
    if (taskToOwner[taskId]== msg.sender) {
      tasks[taskId].isDeleted= isDeleted;
      emit DeleteTask(taskId, isDeleted);

    }
  }
}



  
