export interface IStage {
  name: string;
  deliverables: string[];
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
