const configureRootEthereum = async (hre, taskArgs) => {
  console.log("003-configureRootEthereum started");

  const FxERC20RootTunnelFactory = await hre.ethers.getContractFactory(
    "FxERC20RootTunnel"
  );
  const fxERC20RootTunnelDeployment = await FxERC20RootTunnelFactory.attach(
    taskArgs.fxRootTunnelAddress
  );

  await (
    await fxERC20RootTunnelDeployment.setFxChildTunnel(
      taskArgs.fxChildTunnelAddress
    )
  ).wait();
  console.log(
    `FxERC20RootTunnel: called setFxChildTunnel with fxChildTunnelAddress=${taskArgs.fxChildTunnelAddress}`
  );

  console.log("003-configureRootEthereum finished");
};

module.exports = {
  configureRootEthereum,
};
