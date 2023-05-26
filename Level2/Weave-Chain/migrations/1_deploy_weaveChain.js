const WeaveChain = artifacts.require("WeaveChain");

module.exports = function(deployer) {
  deployer.deploy(WeaveChain);
};