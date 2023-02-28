import { useState, useEffect } from "react";
import { IStage } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
import {
  getSmartContractWithProvider,
  getSmartContractWithSigner,
} from "./../utils/ContractUtils";
import toast from "react-hot-toast";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import { useParams } from "react-router-dom";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import { useProvider, useSigner } from "wagmi";
import { constants, ethers } from "ethers";

export const useSingleStageHandler = () => {
  const { stageId } = useParams();
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [stage, setStage] = useState<IStage | null>(null);
  const [userVote, setUserVote] = useState<boolean>(false);
  const [voteBtnDisable, setVoteBtnDisable] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
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
      if (stageAddress) {
        const stageContract = await getSmartContractWithProvider(
          stageAddress,
          provider,
          JSON.stringify(StageContract.abi)
        );
        const stageIpfsKey = await stageContract.ipfsKey();
        const expiryBlock = await stageContract.expiryBlock();
        const startBlock = await stageContract.startBlock();
        const isComplete = await stageContract.isComplete();
        const projectOwner = await stageContract.projectOwner();
        const stageIpfsData = await getStageData(stageIpfsKey);
        const isSuccess = await stageContract.isSuccess();
        const yays = await stageContract.yays();
        const totalVotes = await stageContract.totalVotes();
        const totalCommitted = await stageContract.totalCommitted();
        const obj: IStage = {
          stage: stageIpfsData,
          stageContract: {
            isComplete,
            isSuccess,
            startBlock: parseInt(startBlock.toString()),
            expiryBlock: parseInt(expiryBlock.toString()),
            yays: parseInt(yays.toString()),
            totalVotes: parseInt(totalVotes.toString()),
            totalCommitted: parseFloat(
              ethers.utils.formatEther(totalCommitted.toString())
            ),
            projectOwner,
          },
        };
        setStage(obj);
      }
    };
    if (stageAddress) {
      fetchStage();
    }
  }, [provider, stageAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDonationAmount(parseFloat(newValue));
  };

  const transferAmount = async () => {
    if (donationAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!stageAddress || constants.AddressZero === stageAddress) {
      toast.error("Please enter a valid stage address");
      return;
    }
    if (!signer) {
      toast.error("Please connect you wallet");
      return;
    }
    setBtnDisable(true);
    const loading = toast.loading("Loading...");
    try {
      const stageContract = await getSmartContractWithSigner(
        stageAddress,
        signer,
        JSON.stringify(StageContract.abi)
      );
      const tx = await stageContract.commitFunds({
        value: ethers.utils.parseEther(donationAmount.toString()),
      });
      await tx.wait();
      toast.success("Your transaction was successful");
    } catch (err) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        if (err.message.includes("invalid address")) {
          toast.error("Please provide a valid stage address");
        } else if (err.message.includes("user rejected transaction")) {
          toast.error("Transaction rejected");
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
    setBtnDisable(false);
  };

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

  return {
    stage,
    handleInputChange,
    transferAmount,
    donationAmount,
    btnDisable,
    setUserVote,
    addUserVote,
    voteBtnDisable,
  };
};
