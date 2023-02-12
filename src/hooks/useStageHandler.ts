// import { useSigner } from "wagmi";
import { IStage } from "../interfaces/IStage";
import { useState } from "react";
import { addStageToIpfs } from "../utils/ipfsUtils";
// import { getSmartContractWithSigner } from "../utils/ContractUtils";
// import StageFactory from "@daoseeder/core/artifacts/contracts/StageFactory.sol/StageFactory.json";
export const useStageHandler = () => {
  // const STAGE_CONTRACT_ADDRESS = process.env.REACT_APP_STAGE_FACTORY_ADDRESS;
  // const { data: signer } = useSigner();
  const [stageName, setStageName] = useState<string>("");
  const [deliverable, setDeliverable] = useState<string>("");
  const [stageDeliverables, setStageDeliverables] = useState<string[]>([]);
  const [stageInvestment, setstageInvestment] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<Date | null>(new Date());

  const addStage = async () => {
    // if (signer && STAGE_CONTRACT_ADDRESS) {
    // const contract = getSmartContractWithSigner(
    //   STAGE_CONTRACT_ADDRESS,
    //   signer,
    //   JSON.stringify(StageFactory.abi)
    // );
    const stage: IStage = {
      name: stageName,
      expiryDate: expiryDate || new Date(),
      deliverables: stageDeliverables,
      stageInvestment: stageInvestment,
      dateInString: "",
    };
    addStageToIpfs(stage);
    // const tx = await contract.createStage("project_token", cid);
    // await tx.wait();
    // } else {
    //   console.log("Please connect your wallet");
    //   return;
    // }
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
    setstageInvestment,
    setExpiryDate,
    expiryDate,
  };
};
