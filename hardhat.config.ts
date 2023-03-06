import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
import "./tasks/accounts.ts";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337, // We set 1337 to make interacting with MetaMask simpler
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
    },
    GSChain: {
      chainId: 42662,
      url: "http://localhost:8545",
      accounts: {
        mnemonic:
          "myth like bonus scare over problem client lizard pioneer submit female collect",
        path: "m/44'/60'/0'/0",
      },
    },
  },
};

export default config;
