const CONFIG = {
  checkpointManager: "0x2890bA17EfE978480615e330ecB65333b880928e",
  fxRoot: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
};
const deployRootEthereum = async (hre) => {
  console.log("001-deployRootEthereum started");

  const FxERC20Factory = await hre.ethers.getContractFactory("FxERC20");
  const fxERC20RootDeployment = await FxERC20Factory.deploy();
  await fxERC20RootDeployment.deployed();
  console.log(`FxERC20Root deployed at: ${fxERC20RootDeployment.address}`);

  const FxERC20RootTunnelFactory = await hre.ethers.getContractFactory(
    "FxERC20RootTunnel"
  );
  const fxERC20RootTunnelDeployment = await FxERC20RootTunnelFactory.deploy(
    CONFIG.checkpointManager,
    CONFIG.fxRoot,
      fxERC20RootDeployment.address
  );
  await fxERC20RootTunnelDeployment.deployed();
  console.log(
    `FxERC20RootTunnel deployed at: ${fxERC20RootTunnelDeployment.address}`
  );

  console.log("001-deployRootEthereum finished");
};

module.exports = {
  deployRootEthereum,
};
