import { useState, useEffect } from "react";
import { IStage } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
import {
  fetchCurrentBlock,
  getDateFromBlockNumber,
  getCurrencySymbol,
  getSmartContractWithProvider,
  getSmartContractWithSigner,
  getStageKey,
  getCampaign,
} from "./../utils/ContractUtils";
import toast from "react-hot-toast";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";
import IERC20 from "@openzeppelin/contracts/build/contracts/IERC20.json";
import { useParams, useLocation } from "react-router-dom";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";
import { useProvider, useSigner, useAccount } from "wagmi";
import { constants, ethers, utils } from "ethers";

export const useSingleStageHandler = () => {
  const { state } = useLocation();
  const { id: campaignId, stageId } = useParams();
  const { address: userAddress, isConnected } = useAccount();

  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [stageData, setStageData] = useState<IStage | null>(null);
  const [voteBtnDisable, setVoteBtnDisable] = useState<boolean>(false);
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
  const [openERCModal, setOpenERCModal] = useState<boolean>(false);
  const [tokensCommittedEth, setTokensCommittedEth] = useState<string>();
  const [maxVoteWeight, setMaxVoteWeight] = useState<number>();
  const [currencySymbol, setCurrencySymbol] = useState<string>();

  useEffect(() => {
    async function getSymbol() {
      try {
        if (isConnected && window.ethereum) {
          const symbol = await getCurrencySymbol();
          setCurrencySymbol(symbol);
        }
      } catch (err) {
        console.error(err);
        setCurrencySymbol("ETH");
      }
    }

    if (isConnected) {
      getSymbol();
    }
  }, [isConnected]);
  const [campaignTitle, setCampaignTitle] = useState<string>("");

  useEffect(() => {
    const fetchFactoryData = async () => {
      if (stageId && provider && DAOSEEDER_FACTORY_ADDRESS) {
        const contract = await getSmartContractWithProvider(
          DAOSEEDER_FACTORY_ADDRESS,
          provider,
          JSON.stringify(DaoSeederFactory.abi)
        );
        const stage = await contract.getStage(stageId);
        setStageAddress(stage);
        const maxVoteWeight_ = await contract.maxVoteWeight();
        setMaxVoteWeight(maxVoteWeight_);
      }
    };

    if (stageId && provider) {
      fetchFactoryData();
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, provider, stageId]);

  useEffect(() => {
    const fetchStage = async () => {
      if (parseInt(stageAddress, 16) != 0) {
        let stageIpfsKey,
          expiryBlock,
          startBlock,
          isComplete,
          projectOwner,
          stageIpfsData,
          isSuccess,
          yays,
          totalVotes,
          totalCommitted,
          votingPeriod,
          voted,
          tokensCommitted,
          totalSupply,
          tokensPercent;

        if (state) {
          const stageContract = state.stageContract;
          isComplete = stageContract.isComplete;
          isSuccess = stageContract.isSuccess;
          startBlock = parseInt(stageContract.startBlock.toString());
          expiryBlock = parseInt(stageContract.expiryBlock.toString());
          yays = parseInt(stageContract.yays.toString());
          totalVotes = parseInt(stageContract.totalVotes.toString());
          totalCommitted = parseFloat(
            ethers.utils.formatEther(stageContract.totalCommitted.toString())
          );
          projectOwner = stageContract.projectOwner;
          votingPeriod = parseInt(stageContract.votingPeriod.toString());
          stageIpfsData = state.stage;
          voted = false;
          tokensCommitted = stageContract.tokensCommitted;
          totalSupply = stageContract.totalSupply;
          tokensPercent = stageContract.tokensPercent;
        } else {
          const stageContract = await getSmartContractWithProvider(
            stageAddress,
            provider,
            JSON.stringify(StageContract.abi)
          );
          stageIpfsKey = await stageContract.ipfsKey();
          const expiryBlockBn = await stageContract.expiryBlock();
          expiryBlock = parseInt(expiryBlockBn.toString());
          const startBlockBn = await stageContract.startBlock();
          startBlock = parseInt(startBlockBn.toString());
          isComplete = await stageContract.isComplete();
          projectOwner = await stageContract.projectOwner();
          stageIpfsData = await getStageData(stageIpfsKey);
          isSuccess = await stageContract.isSuccess();
          yays = parseInt(await stageContract.yays().toString());
          totalVotes = parseInt(await stageContract.totalVotes().toString());
          const totalCommittedBn = await stageContract.totalCommitted();
          totalCommitted = parseFloat(
            ethers.utils.formatEther(totalCommittedBn.toString())
          );
          const votingPeriodBn = await stageContract.votingPeriod();
          votingPeriod = parseInt(votingPeriodBn.toString());
          voted = false;
          if (userAddress) {
            voted = await stageContract.voted(userAddress);
          }
          const projectToken = await stageContract.projectToken();
          const tokenContract = getSmartContractWithProvider(
            projectToken,
            provider,
            JSON.stringify(IERC20.abi)
          );
          const tokensCommittedBn = await tokenContract.balanceOf(
            stageContract.address
          );
          tokensCommitted = parseInt(tokensCommittedBn.toString());
          setTokensCommittedEth(utils.formatEther(tokensCommittedBn));
          const totalSupplyBn = await tokenContract.totalSupply();
          totalSupply = parseInt(totalSupplyBn.toString());
          tokensPercent = !totalSupply
            ? 0
            : (tokensCommitted * 100) / totalSupply;
        }
        const obj: IStage = {
          stage: stageIpfsData,
          stageContract: {
            isComplete,
            isSuccess,
            startBlock,
            expiryBlock,
            yays,
            totalVotes,
            totalCommitted,
            projectOwner,
            votingPeriod,
            voteEndBlock: expiryBlock + votingPeriod,
            tokensCommitted,
            totalSupply,
            tokensPercent,
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
          userAddress === obj.stageContract.projectOwner &&
          obj.stageContract.isComplete &&
          obj.stageContract.isSuccess
        ) {
          setShowCollectFundsBtn(true);
        }

        if (
          userAddress === obj.stageContract.projectOwner &&
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
  }, [userAddress, provider, stageAddress, state]);

  useEffect(() => {
    const fetchStageData = async () => {
      if (DAOSEEDER_FACTORY_ADDRESS && campaignId) {
        const contract = await getSmartContractWithProvider(
          DAOSEEDER_FACTORY_ADDRESS,
          provider,
          JSON.stringify(DaoSeederFactory.abi)
        );
        const data = await getCampaign(campaignId, contract);
        if (data && parseInt(data.stageCount.toString()) > 0) {
          for (let i = 1; i <= parseInt(data.stageCount.toString()); i++) {
            const stageKey = await getStageKey(data.tokenAddress, i);
            if (stageKey === stageId) {
              setCampaignTitle(data.name + " - Stage (" + i + ")");
              break;
            }
          }
        }
      }
    };

    if (DAOSEEDER_FACTORY_ADDRESS && campaignId && stageId) {
      fetchStageData();
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, campaignId, provider, stageId]);

  const openModal = () => {
    setIsOpen(true);
  };

  const donateNowDialog = () => {
    setIsDonateOpen(true);
  };

  const completeStage = async () => {
    if (!stageData) {
      toast.error("No stage found. Please provide a valid stage");
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
    if (stageData.stageContract.projectOwner !== userAddress) {
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
    if (stageData.stageContract.projectOwner !== userAddress) {
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

  const openERC20Modal = () => {
    setOpenERCModal(true);
  };

  const copyLink = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied Successfully");
  };

  return {
    stageData,
    voteBtnDisable,
    isOpen,
    setIsOpen,
    openModal,
    isDonateOpen,
    donateNowDialog,
    userAddress,
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
    openERC20Modal,
    setOpenERCModal,
    openERCModal,
    tokensCommittedEth,
    maxVoteWeight,
    campaignId,
    copyLink,
    stageAddress,
    setIsDonateOpen,
    setStageData,
    currencySymbol,
    campaignTitle,
  };
};
