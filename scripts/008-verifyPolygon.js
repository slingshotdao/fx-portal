const CONFIG = {
  fxChildId: "0xCf73231F28B7331BBe3124B907840A94851f9f11",
};
const verifyPolygon = async (hre, taskArgs) => {
  console.log("007-verifyEthereum started");

  await hre.run("verify:verify", {
    address: taskArgs.fxChildTokenAddress,
    constructorArguments: [],
  });
  await hre.run("verify:verify", {
    address: taskArgs.fxChildTunnelAddress,
    constructorArguments: [CONFIG.fxChildId, taskArgs.fxChildTokenAddress],
  });
  console.log("007-verifyEthereum finished");
};

module.exports = {
  verifyPolygon,
};
