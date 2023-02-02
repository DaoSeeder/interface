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

export const getSmartContractWithSigner = (
  contractAddress: string,
  signer: Signer,
  abi: string
): Contract => {
  return new Contract(contractAddress, JSON.parse(abi), signer);
};
