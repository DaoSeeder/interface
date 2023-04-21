import { constants, utils } from "ethers";
import { getSmartContractWithSigner } from "../utils/ContractUtils";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { useSigner } from "wagmi";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";

export const useStageAddVoteHandler = (
  stageAddress: string,
  showVotingBtn: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { data: signer } = useSigner();
  const [voteBtnDisable, setVoteBtnDisable] = useState<boolean>(false);
  const [userVote, setUserVote] = useState<boolean>(false);

  const submitUserVote = async () => {
    if (
      !stageAddress ||
      constants.AddressZero === stageAddress ||
      !utils.isAddress(stageAddress)
    ) {
      toast.error("Please enter a valid stage address");
      return;
    }
    if (!signer) {
      toast.error("Please connect you wallet");
      return;
    }

    if (!showVotingBtn) {
      toast.error(
        "The stage is still active. You can only vote when the stage is completed"
      );
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
      if (err instanceof Error) {
        if (err.message && err.message.includes("Active()")) {
          toast.error("The stage is still active. You can not add vote");
        } else {
          toast.error(
            "An error occurred while processing the transaction. Please try again"
          );
        }
      } else {
        toast.error(
          "An error occurred while processing the request. Please try again"
        );
      }
      setVoteBtnDisable(false);
    }
    toast.dismiss(loading);
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { voteBtnDisable, setUserVote, submitUserVote, closeModal };
};
