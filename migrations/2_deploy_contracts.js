var SecretAuction = artifacts.require("./SecretAuction.sol");

module.exports = function(deployer) {
  deployer.deploy(SecretAuction);
};