export interface IStage {
  name: string;
  expiryDate: Date;
  stageGoal: number;
  deliverables: string[];
  dateInString: string;
}

export interface IStageMetaData {
  isComplete: boolean;
  isSuccess: boolean;
  startBlock: number;
  expiryBlock: number;
  yays: number;
  totalVotes: number;
  lastIndex: number;
  totalCommitted: number;
}
