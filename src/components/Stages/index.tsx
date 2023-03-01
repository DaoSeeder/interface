import React from "react";
import Avatar from "../../assets/avatar.png";
import { BsClockHistory } from "react-icons/bs";
import StageAddVote from "./StageAddVote";
import { useSingleStageHandler } from "../../hooks/useSingleStageHandler";
import StageDonate from "./StageDonate";

function Stage() {
  const {
    stage,
    transferAmount,
    handleInputChange,
    donationAmount,
    btnDisable,
    isOpen,
    closeModal,
    openModal,
    isDonateOpen,
    closeDonateModal,
    donateNowDialog,
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
    shareBtnDiv: "text-light-font-lightV1 dark:text-dark-font-lightV1 ml-2",
    btnShare:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnShareContainer:
      "flex h-full w-full items-center justify-center bg-[#F3F3F3] dark:bg-dark-box dark:text-dark-font-lightV1 rounded-full px-8 py-2",
    deliverables:
      "mt-12 text-3xl font-bold text-light-font-lightV1 dark:text-dark-font-lightV1",
    timeline: "my-12 text-light-font-lightV1 dark:text-dark-font-lightV1",
  };

  return (
    <>
      <StageAddVote isOpen={isOpen} closeModal={closeModal} />
      <StageDonate
        isOpen={isDonateOpen}
        closeModal={closeDonateModal}
        handleInputChange={handleInputChange}
        donationAmount={donationAmount}
        sendTransaction={transferAmount}
        btnDisable={btnDisable}
      />
      <div className={style.campaignDiv}>
        <div className={style.mainCampaign}>
          <div className={style.singleCampaignContainer}>
            <div className={style.topBar}>
              <div className={style.userDetails}>
                <div>
                  <img
                    className={style.userImage}
                    src={Avatar}
                    alt={"userIcon"}
                  />
                </div>
                <div className={style.userData}>
                  <div>{stage?.stageContract.projectOwner}</div>
                </div>
              </div>
              <div className={style.stageProgress}>
                {stage?.stageContract.isComplete
                  ? "Stage Completed"
                  : "In Progress"}
              </div>
            </div>
            <div className={style.stageGoals}>
              <div className={style.stageData}>
                <div className={style.stageTotalMoney}>
                  {stage?.stageContract.totalCommitted}{" "}
                  {process.env.REACT_APP_NETWORK_CURRECNY} raised of{" "}
                  {stage?.stage.stageGoal}{" "}
                  {process.env.REACT_APP_NETWORK_CURRECNY} goal
                </div>
                <div className={style.stageTimeLeft}>
                  <div className={style.timeImage}>
                    <BsClockHistory />
                  </div>
                  <div className={style.totalTimeLeft}>
                    Stage expiration block: {stage?.stageContract.expiryBlock}
                  </div>
                </div>
              </div>
              <div className={style.stageProgressBar}>
                <div
                  style={{
                    width: stage
                      ? (stage?.stageContract.totalCommitted /
                          stage?.stage.stageGoal) *
                          100 +
                        "%"
                      : 0,
                  }}
                  className={`${style.totalProgress}`}
                ></div>
              </div>
            </div>
            <div className={style.stageDetails}>
              <div className={style.stageName}>{stage?.stage.name}</div>
            </div>
            <div className={style.stageBtns}>
              <div className={style.stageDivBtns}>
                <div className={style.stageDonateNow} onClick={donateNowDialog}>
                  Commit Funds
                </div>
                <div className={style.shareBtnDiv}>
                  <div className={style.btnShare}>
                    <div className={style.btnShareContainer}>
                      <p>Share</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={style.stageDonateNow} onClick={openModal}>
                  Add your Vote
                </div>
              </div>
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
        {stage?.stage.deliverables &&
          stage?.stage.deliverables.length > 0 &&
          stage.stage.deliverables.map((deliverable, idx) => {
            return (
              <p className="module" key={idx}>
                {deliverable}
              </p>
            );
          })}
      </div>
    </>
  );
}

export default Stage;
