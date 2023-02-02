import { getSmartContractWithSigner } from "./../utils/ContractUtils";
import { ICampaign } from "./../interfaces/ICampaign";
import { useState } from "react";
import { addCampaignToIpfs } from "../apis/ipfsApis";
import { useSigner } from "wagmi";
import CampaignManager from "@daoseeder/core/artifacts/contracts/CampaignManager.sol/CampaignManager.json";

export const useCampaign = () => {
  const CAMPAIGN_CONTRACT_ADDRESS =
    process.env.REACT_APP_CAMPAIGN_CONTRACT_ADDRESS;
  const { data: signer } = useSigner();
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignLogoLink, setCampaignLogoLink] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [campaignWebsiteLink, setCampaignWebsiteLink] = useState<string>("");
  const [campaignTokenAddress, setCampaignTokenAddress] = useState<string>("");
  const [campaignMediaLinks, setCampaignMediaLinks] = useState<string[]>([]);
  const [campaignLink, setCampaignLink] = useState<string>("");

  const addCampaign = async () => {
    if (signer && CAMPAIGN_CONTRACT_ADDRESS) {
      const contract = getSmartContractWithSigner(
        CAMPAIGN_CONTRACT_ADDRESS,
        signer,
        JSON.stringify(CampaignManager.abi)
      );
      const campaign: ICampaign = {
        name: campaignName,
        description: campaignDescription,
        logoLink: campaignLogoLink,
        websiteLink: campaignWebsiteLink,
        mediaLinks: campaignMediaLinks,
        tokenAddress: campaignTokenAddress,
      };
      const cid = addCampaignToIpfs(campaign);
      const tx = await contract.createCampaign("project_token", cid);
      await tx.wait();
    } else {
      console.log("Please connect your wallet");
      return;
    }
  };

  const addMediaLinks = () => {
    if (!campaignLink) return;
    setCampaignMediaLinks((mediaLinks) => [...mediaLinks, campaignLink]);
  };

  const removeMediaLinks = (id: number) => {
    setCampaignMediaLinks((campaignMediaLinks) =>
      campaignMediaLinks.filter((s, i) => i !== id)
    );
  };

  return {
    setCampaignName,
    setCampaignLogoLink,
    setCampaignDescription,
    setCampaignWebsiteLink,
    setCampaignTokenAddress,
    campaignMediaLinks,
    addMediaLinks,
    addCampaign,
    setCampaignLink,
    removeMediaLinks,
  };
};
