export interface IStageIPFSData {
  name: string;
  stageGoal: number;
  deliverables: string[];
}

export interface IStageContractData {
  isComplete: boolean;
  isSuccess: boolean;
  startBlock: number;
  expiryBlock: number;
  yays: number;
  totalVotes: number;
  totalCommitted: number;
  projectOwner: string;
  votingPeriod: number;
}

export interface IStage {
  stage: IStageIPFSData;
  stageContract: IStageContractData;
}

export interface ICampaignStage {
  name: string;
  address: string;
}
