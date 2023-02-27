import { getTimeRemaining } from "./../utils/dateTimeUtils";
import { useState, useEffect } from "react";
import { IStage } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
import {
  getSmartContractWithProvider,
  getSmartContractWithSigner,
} from "./../utils/ContractUtils";
import { constants } from "ethers/lib/ethers";
import toast from "react-hot-toast";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import { useParams } from "react-router-dom";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import { useProvider, useSigner } from "wagmi";

export const useSingleStageHandler = () => {
  const { stageId } = useParams();
  const STAGE_IPFS_HASH = "QmWyxiheWAQx2QEM1tEB44bjg9WcDSyfUieTy77oWa6LXQ";
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [stage, setStage] = useState<IStage | null>(null);
  const [userVote, setUserVote] = useState<boolean>(false);
  const [voteBtnDisable, setVoteBtnDisable] = useState<boolean>(false);
  const [stageAddress, setStageAddress] = useState<string>("");

  useEffect(() => {
    const fetchStageAddress = async () => {
      if (stageId && provider && DAOSEEDER_FACTORY_ADDRESS) {
        const contract = await getSmartContractWithProvider(
          DAOSEEDER_FACTORY_ADDRESS,
          provider,
          JSON.stringify(DaoSeederFactory.abi)
        );
        const stage = await contract.getStage(stageId);
        setStageAddress(stage);
      }
    };

    if (stageId && provider) {
      fetchStageAddress();
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, provider, stageId]);

  useEffect(() => {
    const fetchStage = async () => {
      const res: IStage = await getStageData(STAGE_IPFS_HASH);
      res.dateInString = getTimeRemaining(res.expiryDate);
      setStage(res);
    };
    if (!stage) {
      fetchStage();
    }
  }, [stage]);

  const addUserVote = async () => {
    if (!stageAddress || constants.AddressZero === stageAddress) {
      toast.error("Please enter a valid stage address");
      return;
    }
    if (!signer) {
      toast.error("Please connect you wallet");
      return;
    }
    setVoteBtnDisable(true);
    const loading = toast.loading("Loading...");
    try {
      const stageContract = await getSmartContractWithSigner(
        stageAddress,
        signer,
        JSON.stringify(StageContract.abi)
      );
      const tx = await stageContract.vote(userVote);
      await tx.wait();
      toast.success("Your transaction was successful");
    } catch (err) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        if (err.message && err.message.includes("Active()")) {
          toast.error("The stage is still active. You can not add vote");
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error(
          "An error occurred while processing the request. Please try again"
        );
      }
    }
    toast.dismiss(loading);
    setVoteBtnDisable(false);
  };

  return { stage, setUserVote, addUserVote, voteBtnDisable };
};
