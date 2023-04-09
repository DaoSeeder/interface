#!/bin/bash

ganache -s 326 --database.dbPath="../ganache/" --chain.chainId=326 --wallet.defaultBalance=10000 --chain.allowUnlimitedContractSize --miner.blockGasLimit="0x1C9C380" --miner.blockTime=10 --miner.defaultGasPrice="0x1DCD65000"