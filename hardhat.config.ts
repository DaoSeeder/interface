import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 326,
      accounts: {
        mnemonic: "cat cat cat cat cat cat cat cat cat cat cat cat",
        path: "m/44'/60'/0'/0",
      },
    },
    GSChain: {
      chainId: 326,
      url: "http://localhost:8545",
      accounts: {
        mnemonic: "dog dog dog dog dog dog dog dog dog dog dog dog",
        path: "m/44'/60'/0'/0",
      },
    },
  },
};

export default config;
