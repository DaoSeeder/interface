import { ICampaign } from "./../interfaces/ICampaign";
import { getCampaignData } from "../utils/ipfsUtils";
import { Provider } from "@ethersproject/providers";
import { Contract, ethers, Signer } from "ethers";

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
  const campaignData = await getContractCampaign(campaignKey, contract);
  const ipfsCampaign: ICampaign = await getCampaignData(campaignData.ipfsKey);
  ipfsCampaign.stageCount = campaignData.stageCount;
  return ipfsCampaign;
};

export const getContractCampaign = async (
  campaignKey: string,
  contract: Contract
) => {
  try {
    const campaignData = await contract.getCampaign(campaignKey);
    return campaignData;
  } catch (err) {
    throw new Error("An error occurred while fetching campaign\n" + err);
  }
};

export const getStageKey = (projectToken: string, stageNumber: number) => {
  const abiCoder = new ethers.utils.AbiCoder();
  const encodedParams = abiCoder.encode(
    ["address", "uint256"],
    [projectToken, stageNumber]
  );
  const hash = ethers.utils.keccak256(encodedParams);
  return hash;
};

export const fetchCurrentBlock = async (): Promise<number> => {
  const provider = new ethers.providers.JsonRpcProvider();
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

export const getDateFromBlockNumber = async (
  currentBlockNumber: number,
  targetBlockNumber: number
): Promise<string> => {
  const BLOCK_TIME = process.env.REACT_APP_ETHEREUM_BLOCK_TIME;
  const blockDiff = targetBlockNumber - currentBlockNumber;
  const timeInSeconds = blockDiff * parseInt(BLOCK_TIME || "12");
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + timeInSeconds * 1000);
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year.slice(-2)} ${hours}:${minutes}`;
};

export const getCampaignKey = (projectToken: string) => {
  const abiCoder = new ethers.utils.AbiCoder();
  const encodedParams = abiCoder.encode(["address"], [projectToken]);
  const hash = ethers.utils.keccak256(encodedParams);
  return hash;
};
