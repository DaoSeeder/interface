import { IStage } from "./../interfaces/IStage";
import { useState } from "react";
import { addStageToIpfs } from "../apis/ipfsApis";
export const useStage = () => {
  const [stageName, setStageName] = useState<string>("");
  const [deliverable, setDeliverable] = useState<string>("");
  const [stageDeliverables, setStageDeliverables] = useState<string[]>([]);

  const addStage = () => {
    const stage: IStage = {
      name: stageName,
      deliverables: stageDeliverables,
    };
    addStageToIpfs(stage);
  };

  const addDeliverables = () => {
    if (!deliverable) return;
    setStageDeliverables((mediaLinks) => [...mediaLinks, deliverable]);
  };

  const removeDeliverables = (id: number) => {
    setStageDeliverables((deliverables) =>
      deliverables.filter((s, i) => i !== id)
    );
  };

  return {
    setStageName,
    addStage,
    setDeliverable,
    addDeliverables,
    removeDeliverables,
    stageDeliverables,
  };
};
