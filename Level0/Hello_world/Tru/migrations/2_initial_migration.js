const mood = artifacts.require("mood");

module.exports = function (deployer) {
  deployer.deploy(mood);
};
