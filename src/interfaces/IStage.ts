export interface IStageIPFSData {
  name: string;
  expiryDate: Date;
  stageGoal: number;
  deliverables: string[];
  dateInString: string;
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
}

export interface IStage {
  stage: IStageIPFSData;
  stageContract: IStageContractData;
}

export interface ICampaignStage {
  name: string;
  address: string;
}
