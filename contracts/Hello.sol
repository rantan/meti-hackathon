pragma solidity ^0.5.0;

contract Hello {
  string public message;
  constructor(string memory initMessage) public {
    message = initMessage;
  }
  function update(string memory newMessage) public {
    message = newMessage;
  }
}
