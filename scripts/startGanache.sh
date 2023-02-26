#!/bin/bash

ganache --database.dbPath="../ganache/" --chain.chainId=326 --wallet.defaultBalance=10000 --chain.allowUnlimitedContractSize --miner.blockGasLimit="0x989680" --miner.timestampIncrement=180 --miner.defaultGasPrice="0x1DCD65000"
