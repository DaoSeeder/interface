import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
let secrets = { mnemonic: "", path: "" };
try {
  secrets = require("./secrets.json");
} catch (ex) {}

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: {
        mnemonic: secrets.mnemonic,
        path: secrets.path,
      },
    },
    DSChain: {
      chainId: 326,
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic: secrets.mnemonic,
        path: secrets.path,
      },
    },
  },
};

export default config;
