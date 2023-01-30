import React, { useState } from "react";
import Avatar from "../../assets/avatar.png";
import { BsClockHistory } from "react-icons/bs";
import StageAddVote from "./StageAddVote";

function Stage() {
  const style = {
    campaignDiv:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 mt-12 w-full",
    mainCampaign:
      "rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] w-full drop-shadow-xl",
    signleCampaignContainer:
      "flex flex-col h-full bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 py-2 py-6",
    topBar: "flex justify-between items-end w-full mb-4",
    userDetails: "flex text-sm gap-4",
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
      "w-[80%] bg-gradient-to-r from-light-primary-primary to-light-primary-secondary rounded-3xl h-1.5",
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

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <StageAddVote isOpen={isOpen} closeModal={closeModal} />
      <div className={style.campaignDiv}>
        <div className={style.mainCampaign}>
          <div className={style.signleCampaignContainer}>
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
                  <div>0x71C....976F</div>
                  <div>20 Campaigns</div>
                </div>
              </div>
              <div className={style.stageProgress}>In Progress</div>
            </div>
            <div className={style.stageGoals}>
              <div className={style.stageData}>
                <div className={style.stageTotalMoney}>
                  $40 raised of $95,000 goal
                </div>
                <div className={style.stageTimeLeft}>
                  <div className={style.timeImage}>
                    <BsClockHistory />
                  </div>
                  <div className={style.totalTimeLeft}>4h 30m Left</div>
                </div>
              </div>
              <div className={style.stageProgressBar}>
                <div className={style.totalProgress}></div>
              </div>
              <div className={style.stageDonations}>
                <div>500 Donations</div>
              </div>
            </div>
            <div className={style.stageDetails}>
              <div className={style.stageCategory}>Personal</div>
              <div className={style.stageName}>
                Oculis Lodge: Special Lodging Experience In Nature
              </div>
            </div>
            <div className={style.stageBtns}>
              <div className={style.stageDivBtns}>
                <div className={style.stageDonateNow}>Donate Now</div>
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
        <p className="module">
          Doggo ipsum long bois lotsa pats blep. What a nice floof ruff super
          chub very good spot, the neighborhood pupper lotsa pats. Borkdrive
          shibe shoober what a nice floof, borking doggo.
        </p>
        <p className="module">
          Shoober shooberino adorable doggo many pats, heckin good boys many
          pats pupper wrinkler, corgo maximum borkdrive. A frighten puggo wow
          very biscit.
        </p>
        <p className="module">
          Big ol h*ck adorable doggo vvv smol borking doggo with a long snoot
          for pats big ol, he made many woofs doing me a frighten puggo wow very
          biscit, ruff fat boi ruff long doggo.{" "}
        </p>
        <p className="module">
          Long bois mlem I am bekom fat wrinkler puggo maximum borkdrive big ol
          pupper I am bekom fat, fluffer vvv adorable doggo lotsa pats snoot. I
          am bekom fat ur givin me a spook length boy wow very biscit very good
          spot.
        </p>
        <p className="module">
          Doggo ipsum long bois lotsa pats blep. What a nice floof ruff super
          chub very good spot, the neighborhood pupper lotsa pats. Borkdrive
          shibe shoober what a nice floof, borking doggo.
        </p>
      </div>
    </>
  );
}

export default Stage;
