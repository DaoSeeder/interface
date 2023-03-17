import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: {
        mnemonic: "cat cat cat cat cat cat cat cat cat cat cat cat",
        path: "m/44'/60'/0'/0",
      },
    },
    DSChain: {
      chainId: 326,
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic:
          "frequent bleak moon urban silent mandate black yellow uphold thumb proof amount",
        path: "m/44'/60'/0'/0",
      },
    },
  },
};

export default config;
