import { ethers } from "ethers";
import toast from "react-hot-toast";
import IERC20 from "@openzeppelin/contracts/build/contracts/IERC20.json";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import {
  getCampaign,
  getSmartContractWithProvider,
  getSmartContractWithSigner,
} from "../utils/ContractUtils";
import { useProvider, useSigner } from "wagmi";
import { useState } from "react";

export const useCommitERCTokenModalHandler = (
  stageAddress: string,
  campaignId: string
) => {
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [ercBtnDisable, setErcBtnDisable] = useState<boolean>(false);
  const [ercAmount, setErcAmount] = useState<number>(0);
  const commitERCAmount = async () => {
    if (!signer) {
      toast.error("Please connect you wallet");
      return;
    }

    if (!DAOSEEDER_FACTORY_ADDRESS) {
      toast.error("No factory address found");
      return;
    }

    if (!campaignId) {
      toast.error("No campaign id found");
      return;
    }

    const contract = getSmartContractWithProvider(
      DAOSEEDER_FACTORY_ADDRESS,
      provider,
      JSON.stringify(DaoSeederFactory.abi)
    );
    const data = await getCampaign(campaignId, contract);
    const loading = toast.loading("Loading...");
    if (data) {
      try {
        setErcBtnDisable(true);
        const erc20Contract = await getSmartContractWithSigner(
          data.tokenAddress,
          signer,
          JSON.stringify(IERC20.abi)
        );
        const decimals = await erc20Contract.decimals();
        const amount = ethers.utils.parseUnits(ercAmount.toString(), decimals);
        await erc20Contract.transfer(stageAddress, amount);
        toast.success("Your transaction was successful");
      } catch (err) {
        toast.error("An error occurred while processing the request");
      }
    } else {
      toast.error("No campaign found");
    }
    setErcBtnDisable(false);
    toast.dismiss(loading);
    // closeERC20Modal();
  };
  return { ercBtnDisable, commitERCAmount, setErcAmount };
};
