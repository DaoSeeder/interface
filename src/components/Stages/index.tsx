import React from "react";
import Avatar from "../../assets/avatar.png";
import { BsClockHistory } from "react-icons/bs";
import StageAddVote from "./StageAddVote";
import { useSingleStageHandler } from "../../hooks/useSingleStageHandler";
import StageDonate from "./StageDonate";
import CommitERCTokenModal from "./CommitERCTokenModal";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { commonStyles } from "../../styles/commonStyles";

const Stage = () => {
  const {
    stageData,
    voteBtnDisable,
    isOpen,
    setIsOpen,
    openModal,
    isDonateOpen,
    donateNowDialog,
    userAddress,
    showCompleteBtn,
    completeStage,
    completeBtnDisable,
    showClaimToken,
    claimTokenBtnDisable,
    claimTokens,
    showRefundBtn,
    refundBtnDisable,
    refundTokens,
    showCollectFundsBtn,
    collectFundsBtnDisable,
    collectFunds,
    showWithdrawFundsBtn,
    withdrawFundsBtnDisable,
    withdrawTokens,
    showVotingBtn,
    currBlock,
    expiryDate,
    voteEndDate,
    currBlockTime,
    showCommitBtn,
    openERC20Modal,
    openERCModal,
    tokensCommittedEth,
    maxVoteWeight,
    campaignId,
    copyLink,
    stageAddress,
    setIsDonateOpen,
    setStageData,
    setOpenERCModal,
    currencySymbol,
    campaignTitle,
  } = useSingleStageHandler();
  const style = {
    campaignDiv:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 mt-12 w-full",
    mainCampaign:
      "rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] w-full drop-shadow-xl",
    singleCampaignContainer:
      "flex flex-col h-full bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 py-2 py-6",
    topBar: "flex justify-between items-end w-full mb-4",
    userDetails: "flex text-sm gap-4 items-center",
    userImage: "w-[40px] rounded-3xl",
    userData: "flex flex-col",
    stageProgress: "text-sm",
    stageGoals: "flex flex-col",
    stageData: "flex justify-between",
    stageTotalMoney: "text-sm",
    stageTimeLeft: "flex gap-4 items-center",
    timeImage: "w-[15px]",
    totalTimeLeft: "text-sm",
    blockTime: "flex flex-col",
    stageProgressBar:
      "w-full bg-transparent rounded-3xl border-light-primary-primary border-[1px] flex items-center mt-4 mb-2 p-px",
    totalProgress:
      "bg-gradient-to-r from-light-primary-primary to-light-primary-secondary rounded-3xl h-1.5",
    stageDonations: "text-xs",
    stageDetails: "flex mt-3 flex-col",
    stageCategory: "text-xs",
    stageName: "text-xl font-bold",
    stageBtns: "flex mt-4 justify-between",
    stageDivBtns: "flex",
    stageDonateNow:
      "bg-gradient-to-r from-light-primary-primary to-light-primary-secondary rounded-3xl py-2 px-8 text-light-font-lightV2 dark:text-dark-font-lightV2 cursor-pointer flex justify-center items-center",
    shareBtnDiv: "flex gap-2 ml-2",
    btnShare:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnShareContainer:
      "flex h-full w-full items-center justify-center bg-[#F3F3F3] dark:bg-dark-box dark:text-dark-font-lightV1 rounded-full px-8 py-2",
    deliverables:
      "mt-12 text-3xl font-bold text-light-font-lightV1 dark:text-dark-font-lightV1",
    timeline: "my-12 text-light-font-lightV1 dark:text-dark-font-lightV1",
    disableBtn: "pointer-events-none",
    expDate: "text-xs",
    rtnCampaign:
      "w-fit p-2 rounded-2xl text-light-font-lightV1 dark:text-dark-font-lightV1 text-sm cursor-pointer mb-4 hover:bg-gray-400 hover:dark:bg-dark-border-light",
  };

  return (
    <>
      <StageAddVote
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        maxVoteWeight={maxVoteWeight}
        stageAddress={stageAddress}
        showVotingBtn={showVotingBtn}
      />
      <StageDonate
        isOpen={isDonateOpen}
        stageAddress={stageAddress}
        setIsDonateOpen={setIsDonateOpen}
        stageData={stageData}
        setStageData={setStageData}
      />
      <CommitERCTokenModal
        isOpen={openERCModal}
        setIsOpen={setOpenERCModal}
        stageAddress={stageAddress}
      />
      <div className={style.campaignDiv}>
        <div className={style.mainCampaign}>
          <div className={style.singleCampaignContainer}>
            {campaignId && (
              <Link
                to={`/campaign/${campaignId}`}
                className={style.rtnCampaign}
              >
                <BiArrowBack />
              </Link>
            )}
            <div className={style.topBar}>
              <div className={style.userDetails}>
                <div>
                  <img
                    className={style.userImage}
                    src={Avatar}
                    alt={"userIcon"}
                    title={"Owner: " + stageData?.stageContract?.projectOwner}
                  />
                </div>
                <div className={style.userData}>
                  <div className={commonStyles.heading}>{campaignTitle}</div>
                </div>
              </div>
              <div className={style.stageProgress}>
                {!showVotingBtn
                  ? stageData?.stageContract?.isComplete
                    ? "Stage Completed"
                    : "In Progress"
                  : null}
                {showVotingBtn ? "Voting and evaluation" : null}
                {stageData?.stageContract?.isComplete
                  ? stageData?.stageContract?.isSuccess
                    ? " (Success) "
                    : " (Failed) "
                  : ""}
              </div>
            </div>
            <div className={style.stageGoals}>
              <div className={style.stageData}>
                <div className={style.stageTotalMoney}>
                  <div>
                    {stageData?.stageContract?.totalCommitted} {currencySymbol}{" "}
                    raised of {stageData?.stage?.goal} {currencySymbol} goal
                  </div>
                  <div>
                    Token reward committed: {tokensCommittedEth} (
                    {stageData?.stageContract?.tokensPercent.toFixed(1)}% of
                    supply)
                  </div>
                </div>
                <div className={style.stageTimeLeft}>
                  <div className={style.timeImage}>
                    <BsClockHistory />
                  </div>
                  <div className={style.blockTime}>
                    <div className={style.totalTimeLeft}>
                      Expiration Block: {stageData?.stageContract?.expiryBlock}{" "}
                      <span className={style.expDate}>({expiryDate})</span>
                    </div>
                    <div className={style.totalTimeLeft}>
                      Vote End Block: {stageData?.stageContract?.voteEndBlock}{" "}
                      <span className={style.expDate}>({voteEndDate})</span>
                    </div>
                    <div className={style.totalTimeLeft}>
                      Current Block: {currBlock}{" "}
                      <span className={style.expDate}>({currBlockTime})</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.stageProgressBar}>
                <div
                  style={{
                    width: stageData
                      ? (stageData?.stageContract?.totalCommitted /
                          stageData?.stage?.goal) *
                          100 +
                        "%"
                      : 0,
                  }}
                  className={`${style.totalProgress}`}
                ></div>
              </div>
            </div>
            <div className={style.stageDetails}>
              <div className={style.stageName}>{stageData?.stage?.name}</div>
            </div>
            <div className={style.stageBtns}>
              <div className={style.stageDivBtns}>
                {showCommitBtn ? (
                  <div
                    className={style.stageDonateNow}
                    onClick={donateNowDialog}
                  >
                    Support This Project
                  </div>
                ) : null}
                <div className={style.shareBtnDiv}>
                  <div className={style.btnShare} onClick={copyLink}>
                    <div className={style.btnShareContainer}>
                      <p>Share</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {stageData?.stageContract?.projectOwner !== userAddress &&
                showVotingBtn ? (
                  <div
                    className={`${style.stageDonateNow} ${
                      voteBtnDisable ? style.disableBtn : ""
                    }`}
                    onClick={openModal}
                  >
                    Add your Vote
                  </div>
                ) : null}
                {showCompleteBtn ? (
                  <div
                    className={`${style.stageDonateNow} ${
                      completeBtnDisable ? style.disableBtn : ""
                    }`}
                    onClick={completeStage}
                  >
                    Complete Stage
                  </div>
                ) : null}
                {showClaimToken ? (
                  <div
                    className={`${style.stageDonateNow} ${
                      claimTokenBtnDisable ? style.disableBtn : ""
                    }`}
                    onClick={claimTokens}
                  >
                    Claim Tokens
                  </div>
                ) : null}
                {showRefundBtn ? (
                  <div
                    className={`${style.stageDonateNow} ${
                      refundBtnDisable ? style.disableBtn : ""
                    }`}
                    onClick={refundTokens}
                  >
                    Refund Tokens
                  </div>
                ) : null}
                {showCollectFundsBtn ? (
                  <div
                    className={`${style.stageDonateNow} ${
                      collectFundsBtnDisable ? style.disableBtn : ""
                    }`}
                    onClick={collectFunds}
                  >
                    Collect Funds
                  </div>
                ) : null}
                {showWithdrawFundsBtn ? (
                  <div
                    className={`${style.stageDonateNow} ${
                      withdrawFundsBtnDisable ? style.disableBtn : ""
                    }`}
                    onClick={withdrawTokens}
                  >
                    Withdraw Tokens
                  </div>
                ) : null}
              </div>
              {stageData?.stageContract?.projectOwner === userAddress ? (
                <div
                  className={`${style.stageDonateNow}`}
                  onClick={openERC20Modal}
                >
                  Commit ERC20
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className={style.deliverables}>
        <div>
          <p>Deliverables</p>
        </div>
      </div>

      <div className={style.timeline}>
        {stageData?.stage?.deliverables &&
          stageData?.stage?.deliverables.length > 0 &&
          stageData.stage.deliverables.map((deliverable, idx) => {
            return (
              <p className="module" key={idx}>
                {deliverable}
              </p>
            );
          })}
      </div>
    </>
  );
};

export default Stage;
