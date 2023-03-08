import { IStageIPFSData } from "../interfaces/IStage";
import { ICampaign } from "../interfaces/ICampaign";
import { create, IPFSHTTPClient } from "ipfs-http-client";

export const addCampaignToIpfs = async (
  campaign: ICampaign
): Promise<string> => {
  try {
    const client = await getIpfsClient();
    if (client) {
      const file = await client.add(JSON.stringify(campaign));
      return file.path;
    } else {
      throw new Error("Could not get ipfs client. Please try again");
    }
  } catch (err) {
    throw "An error occurred while adding data to ipfs.\n" + err;
  }
};

export const getCampaignData = async (ipfsKey: string): Promise<ICampaign> => {
  let data: ICampaign = {
    name: "",
    description: "",
    logoLink: "",
    websiteLink: "",
    mediaLinks: [""],
    tokenAddress: "",
    campaignKey: "",
    stageCount: 0,
  };
  data = await fetch(`https://ipfs.io/ipfs/${ipfsKey}`)
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

export const addStageToIpfs = async (
  stage: IStageIPFSData
): Promise<string> => {
  try {
    const client = await getIpfsClient();
    if (client) {
      const file = await client.add(JSON.stringify(stage));
      return file.path;
    } else {
      throw new Error("Could not get ipfs client. Please try again");
    }
  } catch (err) {
    throw "An error occurred while adding data to ipfs.\n" + err;
  }
};

export const getStageData = async (
  ipfsKey: string
): Promise<IStageIPFSData> => {
  let data: IStageIPFSData = {
    name: "",
    deliverables: [""],
    goal: 0,
  };
  data = await fetch(`https://ipfs.io/ipfs/${ipfsKey}`)
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

const getIpfsClient = async (): Promise<IPFSHTTPClient> => {
  const auth =
    "Basic " +
    btoa(
      process.env.REACT_APP_INFURA_PROJECT_ID +
        ":" +
        process.env.REACT_APP_INFURA_API_SECRET
    );
  return create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
};
