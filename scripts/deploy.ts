import { ethers } from "hardhat";

import DaoSeederFactoryJSON from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import StageJSON from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import CampaignManagerJSON from "@daoseeder/core/artifacts/contracts/CampaignManager.sol/CampaignManager.json";
import TestERC20JSON from "@daoseeder/core/artifacts/contracts/test/TestERC20.sol/TestERC20.json";
import { addCampaignToIpfs, addStageToIpfs } from "../src/utils/ipfsUtils";
import dotenv from "dotenv";
import campaigns from "./campaigns.json";
import stages from "./stages.json";
import { getDateDifferenceInSeconds } from "../src/utils/dateTimeUtils";
import { getStageKey } from "../src/utils/ContractUtils";
import { BigNumber } from "ethers";

export async function main() {
  const [owner] = await ethers.getSigners();
  console.log(`user with address ${owner.address} logged in`);
  const DaoSeederFactory = new ethers.ContractFactory(
    DaoSeederFactoryJSON.abi,
    DaoSeederFactoryJSON.bytecode,
    owner
  );
  const daoSeederFactory = await DaoSeederFactory.deploy(owner.address);
  await daoSeederFactory.deployed();
  console.log("daoSeederFactoryAddress: ", daoSeederFactory.address);

  const Stage = new ethers.ContractFactory(
    StageJSON.abi,
    StageJSON.bytecode,
    owner
  );
  const stage = await Stage.deploy(daoSeederFactory.address);
  await stage.deployed();
  console.log("stageAddress: ", stage.address);

  await daoSeederFactory.setStage(stage.address);

  const CampaignManager = new ethers.ContractFactory(
    CampaignManagerJSON.abi,
    CampaignManagerJSON.bytecode,
    owner
  );
  const campaignManager = await CampaignManager.deploy(
    daoSeederFactory.address
  );
  const campaignManagerAddress = campaignManager.address;
  console.log("campaignManagerAddress: ", campaignManagerAddress);

  // daoSeederFactory

  dotenv.config({ path: `.env.local` });
  const TestERC20 = new ethers.ContractFactory(
    TestERC20JSON.abi,
    TestERC20JSON.bytecode,
    owner
  );
  for (let i = 0; i < campaigns.length; i++) {
    const testERC20 = await TestERC20.deploy("Test Token", "TOK" + i);
    console.log("TOK" + i + " Address: ", testERC20.address);
    campaigns[i].tokenAddress = testERC20.address;
    const cid = await addCampaignToIpfs(campaigns[i]);
    if (cid) {
      console.log("ipfs cid", cid);
      const tx = await daoSeederFactory.createCampaign(testERC20.address, cid);
      await tx.wait();

      const date = new Date();
      date.setDate(date.getDate() + 1);

      const diffInSeconds = getDateDifferenceInSeconds(date);
      const blockExpiry = Math.floor(
        diffInSeconds /
          parseInt(process.env.REACT_APP_ETHEREUM_BLOCK_TIME || "12")
      );

      const cidStage = await addStageToIpfs(stages[i]);
      const txStage = await daoSeederFactory.createStage(
        testERC20.address,
        stages[i].goal,
        blockExpiry,
        cidStage
      );
      await txStage.wait();
      const key = getStageKey(testERC20.address, 1);
      const stageAddress = await daoSeederFactory.getStage(key);
      console.log("owner", owner.address);
      console.log("stageAddress", stageAddress);
      const amt = BigNumber.from(5000).mul(
        BigNumber.from(10).pow(BigNumber.from(18))
      );
      await testERC20.approve(owner.address, amt);
      await testERC20.transferFrom(owner.address, stageAddress, amt);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
