export interface IStage {
  name: string;
  expiryDate: Date;
  stageGoal: number;
  deliverables: string[];
  dateInString: string;
}

export interface IStageMetaData {
  stage: IStage;
  isComplete: boolean;
  isSuccess: boolean;
  startBlock: number;
  expiryBlock: number;
  yays: number;
  totalVotes: number;
  lastIndex: number;
  totalCommitted: number;
  projectOwner: string;
}

export interface ICampaignStage {
  name: string;
  address: string;
}
