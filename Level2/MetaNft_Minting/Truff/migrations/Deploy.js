const Metaverse = artifacts.require("Metaverse");

module.exports = function (deployer) {
  deployer.deploy(Metaverse);
};
