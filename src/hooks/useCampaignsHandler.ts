import { useEffect, useState } from "react";
import {
  getCampaigns,
  getSmartContractWithProvider,
  getSmartContractWithSigner,
} from "../utils/ContractUtils";
import { ICampaign } from "../interfaces/ICampaign";
import { addCampaignToIpfs } from "../utils/ipfsUtils";
import { useProvider, useSigner } from "wagmi";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import toast from "react-hot-toast";

export const useCampaignsHandler = () => {
  const provider = useProvider();
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const { data: signer } = useSigner();
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignLogoLink, setCampaignLogoLink] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [campaignWebsiteLink, setCampaignWebsiteLink] = useState<string>("");
  const [campaignTokenAddress, setCampaignTokenAddress] = useState<string>("");
  const [campaignMediaLinks, setCampaignMediaLinks] = useState<string[]>([]);
  const [campaignLink, setCampaignLink] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [totalLen, setTotalLen] = useState<number>(0);
  const [fetchFirstTime, setFetchFirstTime] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  const addCampaign = async () => {
    setDisableBtn(true);
    const loading = toast.loading("Saving...");
    try {
      if (signer && DAOSEEDER_FACTORY_ADDRESS) {
        const contract = await getSmartContractWithSigner(
          DAOSEEDER_FACTORY_ADDRESS,
          signer,
          JSON.stringify(DaoSeederFactory.abi)
        );
        const campaign: ICampaign = {
          name: campaignName,
          description: campaignDescription,
          logoLink: campaignLogoLink,
          websiteLink: campaignWebsiteLink,
          mediaLinks: campaignMediaLinks,
          tokenAddress: campaignTokenAddress,
          campaignKey: "",
          stageCount: 0,
        };
        const cid = await addCampaignToIpfs(campaign);
        if (cid) {
          const tx = await contract.createCampaign(campaignTokenAddress, cid);
          await tx.wait();
          toast.success("Your transaction was successful");
        } else {
          toast.error("Ipfs did not return a valid value. Please try again");
        }
      } else {
        toast.error("Please connect your wallet");
      }
    } catch (err) {
      toast.error(
        "An error occurred while processing your request. Please try again"
      );
      console.log("An error occurred.\n" + err);
    }
    setDisableBtn(false);
    toast.dismiss(loading);
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
            const len = arrLength > 6 ? arrLength - 6 : 0;
            setTotalLen(arrLength - 6);
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

  const loadMoreCampaigns = async () => {
    try {
      if (provider && DAOSEEDER_FACTORY_ADDRESS) {
        const contract = await getSmartContractWithProvider(
          DAOSEEDER_FACTORY_ADDRESS,
          provider,
          JSON.stringify(DaoSeederFactory.abi)
        );
        if (totalLen > 0) {
          const len = totalLen > 6 ? totalLen - 6 : 0;
          setTotalLen(totalLen - 6);
          // TODO: This looks like it may take too long, might need some paging methods on the contract
          const data = await getCampaigns(contract, len, totalLen);
          setCampaigns((prevCampaign) => [...prevCampaign, ...data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
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
    disableBtn,
    campaigns,
    loadMoreCampaigns,
    totalLen,
  };
};
