const vote = artifacts.require("vote");

module.exports = function (deployer) {
  deployer.deploy(vote);
};