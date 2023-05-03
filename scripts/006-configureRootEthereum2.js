const configureRootEthereum2 = async (hre, taskArgs) => {
  console.log("006-configureRootEthereum2 started");

  const getTokenAmount = (num) => hre.ethers.utils.parseEther(num).toString();

  const { admin1 } = await hre.getNamedAccounts();
  const FxERC20RootTunnelFactory = await hre.ethers.getContractFactory(
    "FxERC20RootTunnel"
  );
  const fxERC20RootTunnelDeployment = await FxERC20RootTunnelFactory.attach(
    taskArgs.fxRootTunnelAddress
  );

  await (
    await fxERC20RootTunnelDeployment.deposit(
      taskArgs.slingAddress,
      admin1,
      getTokenAmount(taskArgs.slingAmount),
      "0x00"
    )
  ).wait();
  console.log(
    `FxERC20RootTunnel called deposit with rootToken=${taskArgs.slingAddress}, user=${admin1}, amount=${taskArgs.slingAmount}`
  );

  console.log("006-configureRootEthereum2 finished");
};

module.exports = {
  configureRootEthereum2,
};
