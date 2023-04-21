import { constants, ethers, utils } from "ethers";
import toast from "react-hot-toast";
import { getSmartContractWithSigner } from "../utils/ContractUtils";
import { Dispatch, SetStateAction, useState } from "react";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import { useSigner } from "wagmi";
import { IStage } from "../interfaces/IStage";

export const useStageDonateHandler = (
  stageAddress: string,
  setIsDonateOpen: Dispatch<SetStateAction<boolean>>,
  stageData: IStage | null,
  setStageData: Dispatch<SetStateAction<IStage | null>>
) => {
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const { data: signer } = useSigner();

  const transferAmount = async () => {
    if (donationAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
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
      const obj = stageData;
      if (obj?.stageContract.totalCommitted) {
        obj.stageContract.totalCommitted += donationAmount;
      } else if (obj) {
        obj.stageContract.totalCommitted = donationAmount;
      }
      setStageData(obj);
      closeDonateModal();
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("invalid address")) {
          toast.error("Please provide a valid stage address");
        } else if (err.message.includes("user rejected transaction")) {
          toast.error("Transaction rejected");
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
    }
    toast.dismiss(loading);
    setBtnDisable(false);
  };

  const closeDonateModal = () => {
    setIsDonateOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDonationAmount(parseFloat(newValue));
  };

  return {
    transferAmount,
    btnDisable,
    handleInputChange,
    donationAmount,
    closeDonateModal,
  };
};
