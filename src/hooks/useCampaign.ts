import { ICampaign } from "./../interfaces/ICampaign";
import { useState } from "react";
import { addCampaignToIpfs } from "../apis/ipfsApis";
export const useCampaign = () => {
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignLogoLink, setCampaignLogoLink] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [campaignWebsiteLink, setCampaignWebsiteLink] = useState<string>("");
  const [campaignTokenAddress, setCampaignTokenAddress] = useState<string>("");
  const [campaignMediaLinks, setCampaignMediaLinks] = useState<string[]>([]);
  const [campaignLink, setCampaignLink] = useState<string>("");

  const addCampaign = () => {
    const campaign: ICampaign = {
      name: campaignName,
      description: campaignDescription,
      logoLink: campaignLogoLink,
      websiteLink: campaignWebsiteLink,
      mediaLinks: campaignMediaLinks,
      tokenAddress: campaignTokenAddress,
    };
    addCampaignToIpfs(campaign);
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
