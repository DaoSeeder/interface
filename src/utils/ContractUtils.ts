import { ICampaign } from "./../interfaces/ICampaign";
import { getCampaignData } from "../utils/ipfsUtils";
import { Provider } from "@ethersproject/providers";
import { Contract, Signer } from "ethers";

export const truncateAddress = (address: string): string => {
  const first = address.substring(0, 5);
  const last = address.substring(address.length - 5);
  return first + "..." + last;
};

export const getSmartContractWithProvider = (
  contractAddress: string,
  provider: Provider,
  abi: string
): Contract => {
  return new Contract(contractAddress, JSON.parse(abi), provider);
};

export const getSmartContractWithSigner = async (
  contractAddress: string,
  signer: Signer,
  abi: string
): Promise<Contract> => {
  return new Contract(contractAddress, JSON.parse(abi), signer);
};

export const getCampaigns = async (
  contract: Contract,
  len: number,
  totalLen: number
): Promise<ICampaign[]> => {
  const ipfsData = [];
  for (let i = totalLen - 1; i >= len; i--) {
    const campaignKey = await contract.allCampaigns(i);
    const ipfsCampaign: ICampaign = await getCampaign(campaignKey, contract);
    ipfsCampaign.campaignKey = campaignKey;
    ipfsData.push(ipfsCampaign);
  }
  return ipfsData;
};

export const getCampaign = async (
  campaignKey: string,
  contract: Contract
): Promise<ICampaign> => {
  const campaignData = await contract.getCampaign(campaignKey);
  const ipfsCampaign: ICampaign = await getCampaignData(campaignData.ipfsKey);
  return ipfsCampaign;
};
