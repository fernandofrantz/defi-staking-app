const Tether = artifacts.require("Tether");

module.exports = async function() {
  await deployer.deploy(Tether);
};
