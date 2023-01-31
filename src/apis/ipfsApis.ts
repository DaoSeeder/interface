import { IStage } from "../interfaces/IStage";
import { ICampaign } from "../interfaces/ICampaign";

export const addCampaignToIpfs = (campaign: ICampaign): string => {
  return "";
};

export const getCampaignData = (ipfsKey: string): ICampaign => {
  const data: ICampaign = {
    name: "",
    description: "",
    logoLink: "",
    websiteLink: "",
    mediaLinks: [""],
    tokenAddress: "",
  };
  return data;
};

export const addStageToIpfs = (stage: IStage): string => {
  return "";
};

export const getStageData = (key: string): IStage => {
  const data: IStage = {
    name: "",
    deliverables: [""],
  };
  return data;
};
