const HelloContract = artifacts.require('Hello.sol');

module.exports = function(deployer) {
  deployer.deploy(HelloContract, 'Hello');
};
