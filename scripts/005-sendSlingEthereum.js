const ERC20Json = require("@openzeppelin/contracts/build/contracts/ERC20.json");

const sendSlingEthereum = async (hre, taskArgs) => {
  console.log("005-sendSlingEthereum started");

  const getTokenAmount = (num) => hre.ethers.utils.parseEther(num).toString();

  const admin1 = await hre.ethers.getNamedSigner("admin1");
  const erc20Factory = new hre.ethers.ContractFactory(
    ERC20Json.abi,
    ERC20Json.bytecode,
    admin1
  );
  const slingshotDeployment = erc20Factory.attach(taskArgs.slingAddress);

  await (
    await slingshotDeployment.approve(
      taskArgs.fxRootTunnelAddress,
      getTokenAmount(taskArgs.slingAmount)
    )
  ).wait();
  console.log(
    `Slingshot: called approve with address=${taskArgs.fxRootTunnelAddress}, amount=${taskArgs.slingAmount}`
  );

  await (
    await slingshotDeployment.transfer(
      taskArgs.fxRootTunnelAddress,
      getTokenAmount(taskArgs.slingAmount)
    )
  ).wait();
  console.log(
      `Slingshot: called transfer with address=${taskArgs.fxRootTunnelAddress}, amount=${taskArgs.slingAmount}`
  );

  console.log("005-sendSlingEthereum finished");
};

module.exports = {
  sendSlingEthereum,
};
