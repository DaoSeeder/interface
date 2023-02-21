import { useProvider } from "wagmi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IStageMetaData } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
import { getSmartContractWithProvider } from "../utils/ContractUtils";
import StageContract from "@daoseeder/core/artifacts/contracts/Stage.sol/Stage.json";

export const useSingleStageHandler = () => {
  const { stageId } = useParams();
  const provider = useProvider();
  const [stage, setStage] = useState<IStageMetaData | null>(null);
  useEffect(() => {
    const fetchStage = async () => {
      if (stageId) {
        const stageContract = await getSmartContractWithProvider(
          stageId,
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
        const lastIndex = await stageContract.lastIndex();
        const totalCommitted = await stageContract.totalCommitted();
        const obj: IStageMetaData = {
          stage: stageIpfsData,
          isComplete,
          isSuccess,
          startBlock: parseInt(startBlock.toString()),
          expiryBlock: parseInt(expiryBlock.toString()),
          yays: parseInt(yays.toString()),
          totalVotes: parseInt(totalVotes.toString()),
          lastIndex: parseInt(lastIndex.toString()),
          totalCommitted: parseInt(totalCommitted.toString()),
          projectOwner,
        };
        setStage(obj);
      }
    };
    if (stageId) {
      fetchStage();
    }
  }, [provider, stageId]);

  return { stage };
};
