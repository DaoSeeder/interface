import { useState, useEffect } from "react";
import { IStage } from "./../interfaces/IStage";
import { getStageData } from "./../utils/ipfsUtils";
export const useSingleStageHandler = () => {
  const STAGE_IPFS_HASH = "QmWyxiheWAQx2QEM1tEB44bjg9WcDSyfUieTy77oWa6LXQ";
  const [stage, setStage] = useState<IStage | null>(null);
  useEffect(() => {
    const fetchStage = async () => {
      const res: IStage = await getStageData(STAGE_IPFS_HASH);
      const Difference_In_Time =
        new Date(res.expiryDate).getTime() - new Date().getTime();
      console.log(Difference_In_Time);
      let time = "Days";
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (Difference_In_Days < 1) {
        time = "hours";
        Difference_In_Days =
          (new Date(res.expiryDate).getTime() - new Date().getTime()) /
          (1000 * 3600);
        if (Difference_In_Days < 1) {
          time = "minutes";
          Difference_In_Days =
            (new Date(res.expiryDate).getTime() - new Date().getTime()) /
            (1000 * 60);
        }
      }
      res.dateInString = Difference_In_Days.toFixed(0).toString() + " " + time;
      setStage(res);
    };
    if (!stage) {
      fetchStage();
    }
  }, [stage]);

  return { stage };
};
