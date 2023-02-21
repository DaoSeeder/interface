import { ICampaignStage } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCampaign,
  getCampaigns,
  getSmartContractWithProvider,
} from "../utils/ContractUtils";
import { useProvider } from "wagmi";
import toast from "react-hot-toast";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import { ICampaign } from "../interfaces/ICampaign";
import { constants } from "ethers";

export const useSingleCampaignHandler = () => {
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
    };
    if (id && DAOSEEDER_FACTORY_ADDRESS && provider) {
      fetchSingleCampaign();
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, id, provider]);

  useEffect(() => {
    const fetchStageData = async () => {
      if (campaign && campaign.stageCount > 0 && DAOSEEDER_FACTORY_ADDRESS) {
        const contract = await getSmartContractWithProvider(
          DAOSEEDER_FACTORY_ADDRESS,
          provider,
          JSON.stringify(DaoSeederFactory.abi)
        );
        const obj: ICampaignStage[] = [];
        for (let i = 0; i < campaign.stageCount; i++) {
          const stageKey = await contract.getKey(campaign.tokenAddress, i);
          const stage = await contract.getStage(stageKey);
          if (constants.AddressZero !== stage) {
            const stageContract = await getSmartContractWithProvider(
              stage,
              provider,
              JSON.stringify(StageContract.abi)
            );
            const stageIpfsKey = await stageContract.ipfsKey();
            const stageIpfsData = await getStageData(stageIpfsKey);
            obj.push({ name: stageIpfsData.name, address: stage });
          }
        }
        setAllStages(obj);
      }
    };

    if (
      campaign &&
      campaign.stageCount > 0 &&
      DAOSEEDER_FACTORY_ADDRESS &&
      provider
    ) {
      fetchStageData();
    }
  }, [campaign, DAOSEEDER_FACTORY_ADDRESS, provider]);

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
  return { campaign, mediaLinkIdx, prevItem, nextItem, campaigns, allStages };
};
