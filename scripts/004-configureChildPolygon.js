const configureChildPolygon = async (hre, taskArgs) => {
  console.log("004-configureChildPolygon started");

  const FxERC20ChildTunnelFactory = await hre.ethers.getContractFactory(
    "FxERC20ChildTunnel"
  );
  const fxERC20ChildTunnelDeployment = await FxERC20ChildTunnelFactory.attach(
    taskArgs.fxChildTunnelAddress
  );

  await (
    await fxERC20ChildTunnelDeployment.setFxRootTunnel(
      taskArgs.fxRootTunnelAddress
    )
  ).wait();
  console.log(
    `FxERC20ChildTunnel: called setFxRootTunnel with fxRootTunnelAddress=${taskArgs.fxRootTunnelAddress}`
  );

  console.log("004-configureChildPolygon finished");
};

module.exports = {
  configureChildPolygon,
};
