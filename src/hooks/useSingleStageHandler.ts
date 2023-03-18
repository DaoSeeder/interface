import { useState, useEffect } from "react";
import { IStage } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
import {
  fetchCurrentBlock,
  getDateFromBlockNumber,
  getSmartContractWithProvider,
  getSmartContractWithSigner,
} from "./../utils/ContractUtils";
import toast from "react-hot-toast";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import { useParams, useLocation } from "react-router-dom";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import { useProvider, useSigner, useBalance, useAccount } from "wagmi";
import { constants, ethers } from "ethers";

export const useSingleStageHandler = () => {
  const { state } = useLocation();
  const { stageId } = useParams();
  const { address } = useAccount();

  const { data: balance } = useBalance({
    address,
  });
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [stageData, setStageData] = useState<IStage | null>(null);
  const [userVote, setUserVote] = useState<boolean>(false);
  const [voteBtnDisable, setVoteBtnDisable] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [stageAddress, setStageAddress] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);
  const [showCompleteBtn, setShowCompleteBtn] = useState<boolean>(false);
  const [completeBtnDisable, setCompleteBtnDisable] = useState<boolean>(false);
  const [showClaimToken, setShowClaimToken] = useState<boolean>(false);
  const [claimTokenBtnDisable, setClaimTokenBtnDisable] =
    useState<boolean>(false);
  const [showRefundBtn, setShowRefundBtn] = useState<boolean>(false);
  const [refundBtnDisable, setRefundBtnDisable] = useState<boolean>(false);
  const [showCollectFundsBtn, setShowCollectFundsBtn] =
    useState<boolean>(false);
  const [collectFundsBtnDisable, setCollectFundsBtnDisable] =
    useState<boolean>(false);
  const [showWithdrawFundsBtn, setShowWithdrawFundsBtn] =
    useState<boolean>(false);
  const [withdrawFundsBtnDisable, setWithdrawFundsBtnDisable] =
    useState<boolean>(false);
  const [showVotingBtn, setShowVotingBtn] = useState<boolean>(false);
  const [currBlock, setCurrBlock] = useState<number>();
  const [expiryDate, setExpiryDate] = useState<string>();
  const [voteEndDate, setVoteEndDate] = useState<string>();
  const [currBlockTime, setCurrBlockTime] = useState<string>();
  const [showCommitBtn, setShowCommitBtn] = useState<boolean>(true);

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
      if (parseInt(stageAddress, 16) != 0) {
        let stageIpfsKey;
        let expiryBlock;
        let startBlock;
        let isComplete;
        let projectOwner;
        let stageIpfsData;
        let isSuccess;
        let yays;
        let totalVotes;
        let totalCommitted;
        let votingPeriod;
        let expiryBlockInt;
        let votingPeriodInt;
        let voted;

        if (state) {
          isComplete = state.stageContract.isComplete;
          isSuccess = state.stageContract.isSuccess;
          startBlock = state.stageContract.startBlock;
          expiryBlock = state.stageContract.expiryBlock;
          yays = state.stageContract.yays;
          totalVotes = state.stageContract.totalVotes;
          totalCommitted = state.stageContract.totalCommitted;
          projectOwner = state.stageContract.projectOwner;
          votingPeriod = state.stageContract.votingPeriod;
          stageIpfsData = state.stage;
          expiryBlockInt = parseInt(expiryBlock.toString());
          votingPeriodInt = parseInt(votingPeriod.toString());
          voted = false;
        } else {
          const stageContract = await getSmartContractWithProvider(
            stageAddress,
            provider,
            JSON.stringify(StageContract.abi)
          );
          stageIpfsKey = await stageContract.ipfsKey();
          expiryBlock = await stageContract.expiryBlock();
          startBlock = await stageContract.startBlock();
          isComplete = await stageContract.isComplete();
          projectOwner = await stageContract.projectOwner();
          stageIpfsData = await getStageData(stageIpfsKey);
          isSuccess = await stageContract.isSuccess();
          yays = await stageContract.yays();
          totalVotes = await stageContract.totalVotes();
          totalCommitted = await stageContract.totalCommitted();
          votingPeriod = await stageContract.votingPeriod();
          expiryBlockInt = parseInt(expiryBlock.toString());
          votingPeriodInt = parseInt(votingPeriod.toString());
          voted = await stageContract.voted(address);
        }
        const obj: IStage = {
          stage: stageIpfsData,
          stageContract: {
            isComplete,
            isSuccess,
            startBlock: parseInt(startBlock.toString()),
            expiryBlock: expiryBlockInt,
            yays: parseInt(yays.toString()),
            totalVotes: parseInt(totalVotes.toString()),
            totalCommitted: parseFloat(
              ethers.utils.formatEther(totalCommitted.toString())
            ),
            projectOwner,
            votingPeriod: votingPeriodInt,
            voteEndBlock: expiryBlockInt + votingPeriodInt,
          },
        };
        setStageData(obj);

        const blockNumber: number = await fetchCurrentBlock();
        setCurrBlock(blockNumber);

        const expirationDate = await getDateFromBlockNumber(
          blockNumber,
          obj.stageContract.expiryBlock
        );

        const voteEndDate = await getDateFromBlockNumber(
          blockNumber,
          obj.stageContract.voteEndBlock
        );

        const currestBlockTime = await getDateFromBlockNumber(
          blockNumber,
          blockNumber
        );

        setExpiryDate(expirationDate);
        setVoteEndDate(voteEndDate);
        setCurrBlockTime(currestBlockTime);

        if (blockNumber > parseInt(obj.stageContract.expiryBlock.toString())) {
          setShowCommitBtn(false);
        }

        if (
          blockNumber >= parseInt(obj.stageContract.expiryBlock.toString()) &&
          blockNumber <
            parseInt(obj.stageContract.expiryBlock.toString()) +
              parseInt(obj.stageContract.votingPeriod.toString()) &&
          !obj.stageContract.isComplete
        ) {
          setShowVotingBtn(true);
        }

        if (voted) setVoteBtnDisable(true);

        if (
          blockNumber >=
            parseInt(obj.stageContract.expiryBlock.toString()) +
              parseInt(obj.stageContract.votingPeriod.toString()) &&
          !obj.stageContract.isComplete
        ) {
          setShowCompleteBtn(true);
        }

        if (obj.stageContract.isComplete && obj.stageContract.isSuccess) {
          setShowClaimToken(true);
        }

        if (obj.stageContract.isComplete && !obj.stageContract.isSuccess) {
          setShowRefundBtn(true);
        }

        if (
          address === obj.stageContract.projectOwner &&
          obj.stageContract.isComplete &&
          obj.stageContract.isSuccess
        ) {
          setShowCollectFundsBtn(true);
        }

        if (
          address === obj.stageContract.projectOwner &&
          obj.stageContract.isComplete &&
          !obj.stageContract.isSuccess
        ) {
          setShowWithdrawFundsBtn(true);
        }
      }
    };
    if (stageAddress) {
      fetchStage();
    }
  }, [address, provider, stageAddress, state]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const donateNowDialog = () => {
    setIsDonateOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateOpen(false);
  };

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

  const submitUserVote = async () => {
    if (!stageData) {
      toast.error("No stage found. Please provide a valid stage");
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

  const completeStage = async () => {
    if (!stageData) {
      toast.error("No stage found. Please provide a valid stage");
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

    const blockNumber: number = await fetchCurrentBlock();

    if (
      blockNumber <
      stageData.stageContract.expiryBlock + stageData.stageContract.votingPeriod
    ) {
      toast.error(
        "The stage is still active. Active stage can not be marked as complete"
      );
      return;
    }

    setCompleteBtnDisable(true);
    const loading = toast.loading("Loading...");
    try {
      const stageContract = await getSmartContractWithSigner(
        stageAddress,
        signer,
        JSON.stringify(StageContract.abi)
      );
      const tx = await stageContract.complete();
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
    }
    setCompleteBtnDisable(false);
    toast.dismiss(loading);
  };

  const claimTokens = async () => {
    if (!stageData) {
      toast.error("No stage found. Please provide a valid stage");
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
    if (!stageData.stageContract.isComplete) {
      toast.error(
        "The stage is still active. Can not claim tokens on an active stage"
      );
      return;
    }
    if (!stageData.stageContract.isSuccess) {
      toast.error("Can not claim tokens from a unsuccessful stage");
      return;
    }

    setClaimTokenBtnDisable(true);
    const loading = toast.loading("Loading...");
    try {
      const stageContract = await getSmartContractWithSigner(
        stageAddress,
        signer,
        JSON.stringify(StageContract.abi)
      );
      const tx = await stageContract.claimTokens();
      await tx.wait();
      toast.success("Your transaction was successful");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message && err.message.includes("Active()")) {
          toast.error("The stage is still active. You can not add vote");
        } else if (err.message && err.message.includes("Failed()")) {
          toast.error(
            "Can not claim tokens because the stage was unsuccessful"
          );
        } else if (err.message && err.message.includes("Actioned()")) {
          toast.error("User has already claimed their tokens");
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
    setClaimTokenBtnDisable(false);
    toast.dismiss(loading);
  };

  const refundTokens = async () => {
    if (!stageData) {
      toast.error("No stage found. Please provide a valid stage");
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
    if (!stageData.stageContract.isComplete) {
      toast.error(
        "The stage is still active. Can not refund token on an active stage"
      );
      return;
    }
    if (stageData.stageContract.isSuccess) {
      toast.error("Can not refund tokens from a successful stage");
      return;
    }

    setRefundBtnDisable(true);
    const loading = toast.loading("Loading...");
    try {
      const stageContract = await getSmartContractWithSigner(
        stageAddress,
        signer,
        JSON.stringify(StageContract.abi)
      );
      const tx = await stageContract.refund();
      await tx.wait();
      toast.success("Your transaction was successful");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message && err.message.includes("Active()")) {
          toast.error("The stage is still active. You can not add vote");
        } else if (err.message && err.message.includes("Succeeded()")) {
          toast.error("Can not refund tokens because the stage was successful");
        } else if (err.message && err.message.includes("Actioned()")) {
          toast.error("User has already refunded their tokens");
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
    setRefundBtnDisable(false);
    toast.dismiss(loading);
  };

  const collectFunds = async () => {
    if (!stageData) {
      toast.error("No stage found. Please provide a valid stage");
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
    if (!stageData.stageContract.isComplete) {
      toast.error(
        "The stage is still active. Can not collect funds on active stage"
      );
      return;
    }
    if (!stageData.stageContract.isSuccess) {
      toast.error("Can not collect funds on an unsuccessful stage");
      return;
    }
    if (stageData.stageContract.projectOwner !== address) {
      toast.error("Only owner can collect the funds");
      return;
    }

    setCollectFundsBtnDisable(true);
    const loading = toast.loading("Loading...");
    try {
      const stageContract = await getSmartContractWithSigner(
        stageAddress,
        signer,
        JSON.stringify(StageContract.abi)
      );
      const tx = await stageContract.collectFunds();
      await tx.wait();
      toast.success("Your transaction was successful");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message && err.message.includes("NoRights()")) {
          toast.error("User do not have the rights to collect funds");
        } else if (err.message && err.message.includes("Active()")) {
          toast.error(
            "Can not collect funds because the stage is still active"
          );
        } else if (err.message && err.message.includes("Failed()")) {
          toast.error("Can not collect funds on an unsuccessful stage");
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
    setCollectFundsBtnDisable(false);
    toast.dismiss(loading);
  };

  const withdrawTokens = async () => {
    if (!stageData) {
      toast.error("No stage found. Please provide a valid stage");
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
    if (!stageData.stageContract.isComplete) {
      toast.error(
        "The stage is still active. Can not withdraw funds on active stage"
      );
      return;
    }
    if (stageData.stageContract.isSuccess) {
      toast.error("Can not withdraw funds on a successful stage");
      return;
    }
    if (stageData.stageContract.projectOwner !== address) {
      toast.error("Only owner can withdraw the funds");
      return;
    }

    setWithdrawFundsBtnDisable(true);
    const loading = toast.loading("Loading...");
    try {
      const stageContract = await getSmartContractWithSigner(
        stageAddress,
        signer,
        JSON.stringify(StageContract.abi)
      );
      const tx = await stageContract.withdrawTokens();
      await tx.wait();
      toast.success("Your transaction was successful");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message && err.message.includes("NoRights()")) {
          toast.error("User do not have the rights to collect funds");
        } else if (err.message && err.message.includes("Active()")) {
          toast.error(
            "Can not withdraw funds because the stage is still active"
          );
        } else if (err.message && err.message.includes("Succeeded()")) {
          toast.error("Can not withdraw funds on a successful stage");
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
    setWithdrawFundsBtnDisable(false);
    toast.dismiss(loading);
  };

  return {
    stageData,
    handleInputChange,
    transferAmount,
    donationAmount,
    btnDisable,
    setUserVote,
    submitUserVote,
    voteBtnDisable,
    isOpen,
    closeModal,
    openModal,
    isDonateOpen,
    closeDonateModal,
    donateNowDialog,
    balance,
    address,
    showCompleteBtn,
    completeStage,
    completeBtnDisable,
    showClaimToken,
    claimTokenBtnDisable,
    claimTokens,
    showRefundBtn,
    refundBtnDisable,
    refundTokens,
    showCollectFundsBtn,
    collectFundsBtnDisable,
    collectFunds,
    showWithdrawFundsBtn,
    withdrawFundsBtnDisable,
    withdrawTokens,
    showVotingBtn,
    currBlock,
    expiryDate,
    voteEndDate,
    currBlockTime,
    showCommitBtn,
  };
};
