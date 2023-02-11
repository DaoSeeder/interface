import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCampaign,
  getCampaigns,
  getSmartContractWithProvider,
} from "../utils/ContractUtils";
import { useProvider } from "wagmi";
import toast from "react-hot-toast";
import CampaignFactory from "@daoseeder/core/artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import { ICampaign } from "../interfaces/ICampaign";

export const useSingleCampaign = () => {
  const { id } = useParams();
  const CAMPAIGN_FACTORY_ADDRESS =
    process.env.REACT_APP_CAMPAIGN_FACTORY_ADDRESS;
  const provider = useProvider();
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [fetchFirstTime, setFetchFirstTime] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [mediaLinkIdx, setMediaLinkIdx] = useState<number>(0);
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (provider && CAMPAIGN_FACTORY_ADDRESS) {
          const contract = await getSmartContractWithProvider(
            CAMPAIGN_FACTORY_ADDRESS,
            provider,
            JSON.stringify(CampaignFactory.abi)
          );
          const campaignLength = await contract.getCampaignsLength();
          const arrLength = parseInt(campaignLength.toString());
          if (arrLength > 0) {
            const len = arrLength > 3 ? arrLength - 3 : 0;
            const data = await getCampaigns(contract, len, arrLength);
            setCampaigns(data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (fetchFirstTime && provider && CAMPAIGN_FACTORY_ADDRESS) {
      setFetchFirstTime(false);
      fetchCampaigns();
    }
  }, [CAMPAIGN_FACTORY_ADDRESS, fetchFirstTime, provider]);

  useEffect(() => {
    const fetchSingleCampaign = async () => {
      try {
        if (provider && CAMPAIGN_FACTORY_ADDRESS && id) {
          const contract = await getSmartContractWithProvider(
            CAMPAIGN_FACTORY_ADDRESS,
            provider,
            JSON.stringify(CampaignFactory.abi)
          );
          const data = await getCampaign(id, contract);
          if (data) {
            setCampaign(data);
          }
        } else {
          toast.error("Please connect your wallet");
        }
      } catch (err) {
        toast.error(
          "An error occurred while fetching campaign. Please try again"
        );
      }
    };
    if (id && CAMPAIGN_FACTORY_ADDRESS && provider) {
      fetchSingleCampaign();
    }
  }, [CAMPAIGN_FACTORY_ADDRESS, id, provider]);

  // TODO: preload all images
  const prevItem = () => {
    if (mediaLinkIdx > 0) setMediaLinkIdx(mediaLinkIdx - 1);
  };

  // TODO: preload all images
  const nextItem = () => {
    if (
      campaign &&
      campaign.mediaLinks.length > 0 &&
      mediaLinkIdx < campaign.mediaLinks.length - 1
    ) {
      setMediaLinkIdx(mediaLinkIdx + 1);
    }
  };
  return { campaign, mediaLinkIdx, prevItem, nextItem, campaigns };
};
