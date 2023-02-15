import { getTimeRemaining } from "./../utils/dateTimeUtils";
import { useState, useEffect } from "react";
import { IStage } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
export const useSingleStageHandler = () => {
  const STAGE_IPFS_HASH = "QmWyxiheWAQx2QEM1tEB44bjg9WcDSyfUieTy77oWa6LXQ";
  const [stage, setStage] = useState<IStage | null>(null);
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

  return { stage };
};
