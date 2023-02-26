import { getStageKey } from "./../utils/ContractUtils";
import { ICampaignStage } from "./../interfaces/IStage";
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
import { ICampaign } from "../interfaces/ICampaign";

export const useSingleCampaignHandler = () => {
  const { id } = useParams();
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const PAGE_JUMP = 5;

  const provider = useProvider();
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [fetchFirstTime, setFetchFirstTime] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [mediaLinkIdx, setMediaLinkIdx] = useState<number>(0);
  const [allStages, setAllStages] = useState<ICampaignStage[] | null>(null);
  const [currentStages, setCurrentStages] = useState<ICampaignStage[] | null>(
    null
  );
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
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
      if (campaign && campaign.stageCount > 0) {
        const obj: ICampaignStage[] = [];
        for (let i = 0; i < campaign.stageCount; i++) {
          const stageKey = await getStageKey(campaign.tokenAddress, i);
          obj.push({ name: "Stage " + (i + 1), address: stageKey });
        }
        const stagesSlice = obj.slice(0, PAGE_JUMP);
        setAllStages(obj);
        setCurrentStages(stagesSlice);
        setTotalPages(
          Array.from(Array(Math.ceil(obj.length / PAGE_JUMP)).keys())
        );
      }
    };

    if (campaign && campaign.stageCount > 0) {
      fetchStageData();
    }
  }, [campaign]);

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

  const changePage = (page: number) => {
    if (allStages === null || allStages?.length === 0) return;
    const stagesSlice = allStages.slice(
      page * PAGE_JUMP,
      page * PAGE_JUMP + PAGE_JUMP
    );
    setCurrentPage(page);
    setCurrentStages(stagesSlice);
  };

  const prevPage = () => {
    if (allStages === null || allStages?.length === 0) return;
    const page = currentPage - 1 < 0 ? 0 : currentPage - 1;
    const stagesSlice = allStages.slice(
      page * PAGE_JUMP,
      page * PAGE_JUMP + PAGE_JUMP
    );
    setCurrentPage(page);
    setCurrentStages(stagesSlice);
  };

  const nextPage = () => {
    if (allStages === null || allStages?.length === 0) return;
    let page = currentPage;
    if (currentPage + 1 !== Math.ceil(allStages.length / PAGE_JUMP)) {
      page = currentPage + 1;
    }
    const stagesSlice = allStages.slice(
      page * PAGE_JUMP,
      page * PAGE_JUMP + PAGE_JUMP
    );
    setCurrentPage(page);
    setCurrentStages(stagesSlice);
  };
  return {
    campaign,
    mediaLinkIdx,
    prevItem,
    nextItem,
    campaigns,
    totalPages,
    changePage,
    currentStages,
    prevPage,
    nextPage,
  };
};
