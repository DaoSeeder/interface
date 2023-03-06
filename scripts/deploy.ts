import { ethers } from "hardhat";

import DaoSeederFactoryJSON from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import StageJSON from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import CampaignManagerJSON from "@daoseeder/core/artifacts/contracts/CampaignManager.sol/CampaignManager.json";
import { ICampaign } from "../src/interfaces/ICampaign";
import { addCampaignToIpfs } from "../src/utils/ipfsUtils";
import dotenv from "dotenv";

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

  const campaign: ICampaign = {
    name: "Google",
    description: "Google funds",
    logoLink:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
    websiteLink: "https://www.google.com/",
    mediaLinks: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU",
    ],
    tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    campaignKey: "",
    stageCount: 0,
  };
  const cid = await addCampaignToIpfs(campaign);
  if (cid) {
    const tx = await daoSeederFactory.createCampaign(
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
      cid
    );
    await tx.wait();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
