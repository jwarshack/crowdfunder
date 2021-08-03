const Crowdfunder = artifacts.require("Crowdfunder");

module.exports = function (deployer) {
  deployer.deploy(Crowdfunder);
};
