import { getStageKey } from "./../utils/ContractUtils";
import { ICampaignStage } from "./../interfaces/IStage";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getCampaign,
  getCampaigns,
  getSmartContractWithProvider,
} from "../utils/ContractUtils";
import { useAccount, useProvider } from "wagmi";
import toast from "react-hot-toast";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import { ICampaign } from "../interfaces/ICampaign";

export const useSingleCampaignHandler = () => {
  const { state } = useLocation();
  const { address } = useAccount();

  const { id } = useParams();
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;

  const provider = useProvider();
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [fetchFirstTime, setFetchFirstTime] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [mediaLinkIdx, setMediaLinkIdx] = useState<number>(0);
  const [allStages, setAllStages] = useState<ICampaignStage[] | null>(null);

  useEffect(() => {
    if (state) {
      const loading = toast.loading("Fetching campaign...");
      const data: ICampaign = {
        name: state.name,
        logoLink: "",
        description: state.description,
        websiteLink: state.websiteLink,
        mediaLinks: state.mediaLinks,
        tokenAddress: state.tokenAddress,
        campaignKey: "",
        stageCount: 0,
        owner: state.owner,
      };
      setCampaign(data);
      toast.dismiss(loading);
    }
  }, [state]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (provider && DAOSEEDER_FACTORY_ADDRESS) {
          const contract = await getSmartContractWithProvider(
            DAOSEEDER_FACTORY_ADDRESS,
            provider,
            JSON.stringify(DaoSeederFactory.abi)
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
    if (fetchFirstTime && provider && DAOSEEDER_FACTORY_ADDRESS) {
      setFetchFirstTime(false);
      fetchCampaigns();
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, fetchFirstTime, provider]);

  useEffect(() => {
    const fetchSingleCampaign = async () => {
      const loading = toast.loading("Fetching campaign...");
      try {
        if (provider && DAOSEEDER_FACTORY_ADDRESS && id) {
          const contract = await getSmartContractWithProvider(
            DAOSEEDER_FACTORY_ADDRESS,
            provider,
            JSON.stringify(DaoSeederFactory.abi)
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
      toast.dismiss(loading);
    };
    if (id && DAOSEEDER_FACTORY_ADDRESS && provider && !state) {
      fetchSingleCampaign();
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, id, provider, state]);

  useEffect(() => {
    const fetchStageData = async () => {
      if (campaign && campaign.stageCount > 0) {
        const obj: ICampaignStage[] = [];
        for (let i = 1; i <= campaign.stageCount; i++) {
          const stageKey = await getStageKey(campaign.tokenAddress, i);
          obj.push({ name: "Stage " + (i + 1), address: stageKey });
        }
        setAllStages(obj);
      }
    };

    if (campaign && campaign.stageCount > 0) {
      fetchStageData();
    }
  }, [campaign]);

  // TODO: preload all images
  const prevItem = () => {
    if (campaign && campaign.mediaLinks.length > 0 && mediaLinkIdx <= 0) {
      setMediaLinkIdx(campaign.mediaLinks.length - 1);
    } else {
      setMediaLinkIdx(mediaLinkIdx - 1);
    }
  };

  // TODO: preload all images
  const nextItem = () => {
    if (
      campaign &&
      campaign.mediaLinks.length > 0 &&
      mediaLinkIdx < campaign.mediaLinks.length - 1
    ) {
      setMediaLinkIdx(mediaLinkIdx + 1);
    } else {
      setMediaLinkIdx(0);
    }
  };

  const copyLink = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied successfully");
  };

  return {
    campaign,
    mediaLinkIdx,
    prevItem,
    nextItem,
    campaigns,
    allStages,
    copyLink,
    address,
  };
};
