require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");

const { deployRootEthereum } = require("./scripts/001-deployRootEthereum");
const { deployChildPolygon } = require("./scripts/002-deployChildPolygon");
const {
  configureRootEthereum,
} = require("./scripts/003-configureRootEthereum");
const {
  configureChildPolygon,
} = require("./scripts/004-configureChildPolygon");
const { sendSlingEthereum } = require("./scripts/005-sendSlingEthereum");
const {
  configureRootEthereum2,
} = require("./scripts/006-configureRootEthereum2");
const { verifyEthereum } = require("./scripts/007-verifyEthereum");
const { verifyPolygon } = require("./scripts/008-verifyPolygon");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

task("deploy:root", "").setAction(
  async (taskArgs, hre) => await deployRootEthereum(hre)
);
task("deploy:child", "").setAction(
  async (taskArgs, hre) => await deployChildPolygon(hre)
);

task("configure:root", "")
  .addParam("fxChildTunnelAddress", "")
  .addParam("fxRootTunnelAddress", "")
  .setAction(
    async (taskArgs, hre) => await configureRootEthereum(hre, taskArgs)
  );

task("configure:child", "")
  .addParam("fxChildTunnelAddress", "")
  .addParam("fxRootTunnelAddress", "")
  .setAction(
    async (taskArgs, hre) => await configureChildPolygon(hre, taskArgs)
  );

task("configure:sendSling", "")
  .addParam("fxRootTunnelAddress", "")
  .addParam("slingAddress", "")
  .addParam("slingAmount", "")
  .setAction(async (taskArgs, hre) => await sendSlingEthereum(hre, taskArgs));

task("configure:root2", "")
  .addParam("fxRootTunnelAddress", "")
  .addParam("slingAddress", "")
  .addParam("slingAmount", "")
  .setAction(
    async (taskArgs, hre) => await configureRootEthereum2(hre, taskArgs)
  );

task("verify:ethereum", "")
  .addParam("fxRootTokenAddress", "")
  .addParam("fxRootTunnelAddress", "")
  .setAction(async (taskArgs, hre) => await verifyEthereum(hre, taskArgs));

task("verify:polygon", "")
  .addParam("fxChildTokenAddress", "")
  .addParam("fxChildTunnelAddress", "")
  .setAction(async (taskArgs, hre) => await verifyPolygon(hre, taskArgs));

const accounts = [
  process.env.ADMIN_ONE_PRIVATE_KEY,
  process.env.ADMIN_TWO_PRIVATE_KEY,
];

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
    },
  },
  namedAccounts: {
    admin1: { default: 0 },
    admin2: { default: 1 },
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts,
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
};

/*
  1. npx hardhat deploy:root --network goerli
  2. npx hardhat deploy:child --network mumbai
  3. npx hardhat configure:root --network goerli --fx-child-tunnel-address 0xcB93705054DcC1f530c3cb42cD3B90c4740e5900 --fx-root-tunnel-address 0x499B621E7272ec0bd1d6aef269cD45f90b5c8821
  4. npx hardhat configure:child --network mumbai --fx-child-tunnel-address 0xcB93705054DcC1f530c3cb42cD3B90c4740e5900 --fx-root-tunnel-address 0x499B621E7272ec0bd1d6aef269cD45f90b5c8821
  5. npx hardhat configure:sendSling --network goerli --fx-root-tunnel-address 0x499B621E7272ec0bd1d6aef269cD45f90b5c8821 --sling-address 0x2e5BEC65e845e950AeC2BF1093E076e0A23FB21F --sling-amount 100
  6. npx hardhat configure:root2 --network goerli --fx-root-tunnel-address 0x499B621E7272ec0bd1d6aef269cD45f90b5c8821 --sling-address 0x2e5BEC65e845e950AeC2BF1093E076e0A23FB21F --sling-amount 100
  7. npx hardhat verify:ethereum --network goerli --fx-root-token-address 0x443c5922C9752BcBf67752622aFA804a1b124780 --fx-root-tunnel-address 0x499B621E7272ec0bd1d6aef269cD45f90b5c8821
  7. npx hardhat verify:polygon --network mumbai --fx-child-token-address 0x4706fABa502CD91243e08C941ED0dC49efb43160 --fx-child-tunnel-address 0xcB93705054DcC1f530c3cb42cD3B90c4740e5900
 */
