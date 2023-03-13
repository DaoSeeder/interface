import { ethers } from "hardhat";

import DaoSeederFactoryJSON from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import StageJSON from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import CampaignManagerJSON from "@daoseeder/core/artifacts/contracts/CampaignManager.sol/CampaignManager.json";
import { addCampaignToIpfs, addStageToIpfs } from "../src/utils/ipfsUtils";
import dotenv from "dotenv";
import campaigns from "./campaigns.json";
import stages from "./stages.json";
import { getDateDifferenceInSeconds } from "../src/utils/dateTimeUtils";

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
  for (let i = 0; i < campaigns.length; i++) {
    const cid = await addCampaignToIpfs(campaigns[i]);
    if (cid) {
      const tx = await daoSeederFactory.createCampaign(
        campaigns[i].tokenAddress,
        cid
      );
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
        campaigns[i].tokenAddress,
        stages[i].goal,
        blockExpiry,
        cidStage
      );
      await txStage.wait();
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
