const CONFIG = {
  checkpointManager: "0x2890bA17EfE978480615e330ecB65333b880928e",
  fxRoot: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
};

const verifyEthereum = async (hre, taskArgs) => {
  console.log("007-verifyEthereum started");

  await hre.run("verify:verify", {
    address: taskArgs.fxRootTokenAddress,
    constructorArguments: [],
  });
  await hre.run("verify:verify", {
    address: taskArgs.fxRootTunnelAddress,
    constructorArguments: [
      CONFIG.checkpointManager,
      CONFIG.fxRoot,
      taskArgs.fxRootTokenAddress,
    ],
  });
  console.log("007-verifyEthereum finished");
};

module.exports = {
  verifyEthereum,
};
