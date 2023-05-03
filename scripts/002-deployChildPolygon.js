const CONFIG = {
  fxChildId: "0xCf73231F28B7331BBe3124B907840A94851f9f11",
};

const deployChildPolygon = async (hre) => {
  console.log("002-deployChildPolygon started");

  const FxERC20ChildFactory = await hre.ethers.getContractFactory("FxERC20");
  const fxERC20ChildDeployment = await FxERC20ChildFactory.deploy();
  await fxERC20ChildDeployment.deployed();

  console.log(`FxERC20Child deployed at: ${fxERC20ChildDeployment.address}`);

  const FxERC20ChildTunnelFactory = await hre.ethers.getContractFactory(
    "FxERC20ChildTunnel"
  );
  const fxERC20ChildTunnelDeployment = await FxERC20ChildTunnelFactory.deploy(
    CONFIG.fxChildId,
    fxERC20ChildDeployment.address
  );
  await fxERC20ChildTunnelDeployment.deployed();

  console.log(
    `FxERC20ChildTunnel deployed at: ${fxERC20ChildTunnelDeployment.address}`
  );

  console.log("002-deployChildPolygon finished");
};

module.exports = {
  deployChildPolygon,
};
