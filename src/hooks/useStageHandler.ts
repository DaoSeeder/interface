import { getDateDifferenceInSeconds } from "./../utils/dateTimeUtils";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance, useSigner } from "wagmi";
import {
  getCampaign,
  getContractCampaign,
  getStageKey,
} from "./../utils/ContractUtils";
import { IStage, IStageIPFSData } from "../interfaces/IStage";
import { addStageToIpfs } from "../utils/ipfsUtils";
import { useNavigate, useParams } from "react-router-dom";
import { useProvider } from "wagmi";
import { getSmartContractWithSigner } from "../utils/ContractUtils";
import { getSmartContractWithProvider } from "../utils/ContractUtils";
import DaoSeederFactory from "@daoseeder/core/artifacts/contracts/DaoSeederFactory.sol/DaoSeederFactory.json";

export const useStageHandler = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { address } = useAccount();

  const { data: balance } = useBalance({
    address,
  });
  const DAOSEEDER_FACTORY_ADDRESS =
    process.env.REACT_APP_DAOSEEDER_FACTORY_ADDRESS;
  const BLOCK_TIME = process.env.REACT_APP_ETHEREUM_BLOCK_TIME;
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [stageName, setStageName] = useState<string>("");
  const [deliverable, setDeliverable] = useState<string>("");
  const [stageDeliverables, setStageDeliverables] = useState<string[]>([]);
  const [stageGoal, setStageGoal] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<Date | null>(new Date());
  const [fetchFirstTime, setFetchFirstTime] = useState<boolean>(true);
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [expiryBlock, setExpiryBlock] = useState<number>(0);

  const fetchCampaign = useCallback(async () => {
    try {
      if (provider && DAOSEEDER_FACTORY_ADDRESS && id) {
        const contract = await getSmartContractWithProvider(
          DAOSEEDER_FACTORY_ADDRESS,
          provider,
          JSON.stringify(DaoSeederFactory.abi)
        );
        const data = await getContractCampaign(id, contract);
        if (!data) {
          toast.error(
            "No Campaign found please. Please enter correct campaign key"
          );
        } else {
          if (data.projectToken) {
            setTokenAddress(data.projectToken);
          }
        }
      }
    } catch (e) {
      if (typeof e === "string") {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, id, provider]);

  useEffect(() => {
    if (id && fetchFirstTime && DAOSEEDER_FACTORY_ADDRESS && provider) {
      setFetchFirstTime(false);
      fetchCampaign();
    }
  }, [DAOSEEDER_FACTORY_ADDRESS, fetchCampaign, fetchFirstTime, id, provider]);

  const addStage = async () => {
    setDisableBtn(true);
    const loading = toast.loading("Saving...");
    try {
      if (signer && DAOSEEDER_FACTORY_ADDRESS) {
        setDisableBtn(true);
        const contract = await getSmartContractWithSigner(
          DAOSEEDER_FACTORY_ADDRESS,
          signer,
          JSON.stringify(DaoSeederFactory.abi)
        );
        const stage: IStageIPFSData = {
          name: stageName,
          deliverables: stageDeliverables,
          goal: stageGoal,
        };
        const cid = await addStageToIpfs(stage);
        const tx = await contract.createStage(
          tokenAddress,
          stageGoal,
          expiryBlock,
          cid
        );
        await tx.wait();
        toast.success("Your transaction was successful");
        // TODO: we should save the factory address in memory instead of keep getting it every time
        if (id) {
          const contract = await getSmartContractWithProvider(
            DAOSEEDER_FACTORY_ADDRESS,
            provider,
            JSON.stringify(DaoSeederFactory.abi)
          );
          const data = await getCampaign(id, contract);
          if (data) {
            const stageKey = await getStageKey(
              data.tokenAddress,
              data.stageCount
            );

            const obj: IStage = {
              stage: {
                goal: stageGoal,
                name: stageName,
                deliverables: stageDeliverables,
              },
              stageContract: {
                isComplete: false,
                isSuccess: false,
                startBlock: 0,
                expiryBlock: expiryBlock,
                yays: 0,
                totalVotes: 0,
                totalCommitted: 0,
                projectOwner: address?.toString() || "",
                votingPeriod: 57600,
                voteEndBlock: 0,
                tokensCommitted: 0,
                totalSupply: 0,
                tokensPercent: 0,
              },
            };
            navigate(`/campaign/${id}/stage/${stageKey}`, {
              state: {
                ...obj,
              },
            });
          }
        }
      } else {
        toast.error("Please connect your wallet");
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes("NotOwner()")) {
          toast.error(
            "Unauthorized access to campaign denied. User is not the owner of this campaign"
          );
        } else {
          toast.error(e.message);
        }
      } else if (typeof e === "string") {
        toast.error(e);
      }
    }
    setDisableBtn(false);
    toast.dismiss(loading);
  };

  const addDeliverables = () => {
    if (!deliverable) return;
    setStageDeliverables((mediaLinks) => [...mediaLinks, deliverable]);
    setDeliverable("");
  };

  const removeDeliverables = (id: number) => {
    setStageDeliverables((deliverables) =>
      deliverables.filter((s, i) => i !== id)
    );
  };

  const setExpiryDateData = async (date: Date | null) => {
    if (date && BLOCK_TIME) {
      setExpiryDate(date);
      const diffInSeconds = getDateDifferenceInSeconds(date);
      const blockExpiry = Math.floor(diffInSeconds / parseInt(BLOCK_TIME));
      setExpiryBlock(blockExpiry);
    }
  };

  return {
    setStageName,
    addStage,
    setDeliverable,
    addDeliverables,
    removeDeliverables,
    stageDeliverables,
    setStageGoal,
    setExpiryDate,
    setExpiryDateData,
    expiryDate,
    disableBtn,
    expiryBlock,
    balance,
    deliverable,
  };
};
