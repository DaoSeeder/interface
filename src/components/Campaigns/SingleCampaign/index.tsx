import React from "react";
import { RiShareBoxFill } from "react-icons/ri";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import CampaignList from "../CampaignList";
import { useSingleCampaignHandler } from "../../../hooks/useSingleCampaignHandler";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { commonStyles } from "../../../styles/commonStyles";

const SingleCampaign = () => {
  const {
    campaign,
    mediaLinkIdx,
    prevItem,
    nextItem,
    campaigns,
    allStages,
    copyLink,
    address,
  } = useSingleCampaignHandler();
  const style = {
    campaignDiv:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 mt-4 w-full",
    mainCampaign:
      "rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] w-full drop-shadow-xl",
    singleCampaign:
      "rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] drop-shadow-xl",
    campaignImageContainer:
      "flex flex-col w-full h-full items-center justify-center bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 py-2",
    singleCampaignContainer:
      "flex flex-col w-full h-full items-center justify-center bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 py-2",
    campaignName: "flex flex-row justify-between mt-4 w-full items-center",
    campaignCategory: "text-xs w-full flex justify-end absolute top-2 right-2",
    category: "capitalize bg-light-primary-primary p-1 text-dark-font-lightV1",
    campaignMoney: "text-sm",
    allCampaigns: "mb-12",
    campaignMoneyRaised: "text-xs",
    campaignTime: "text-sm",
    campaignTimeLeft: "text-xs",
    campaingDesc: "text-sm my-4",
    campaignData: "flex justify-between w-full mb-4",
    campaingImage: "cursor-zoom-in w-full h-[400px]",
    carouselArrows: "flex justify-center items-center gap-4 mt-8 select-none",
    carouselLeft:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary py-1 px-3 text-light-font-lightV2 font-bold text-lg",
    allStages: "flex items-center",
    stageDetails:
      "font-bold text-2xl text-light-font-lightV1 dark:text-dark-font-lightV1 mt-12 mb-4",
    globe: "w-[20px]",
    link: "w-[10px] cursor-pointer",
    eachStage: "flex gap-4 items-center font-semibold w-fit",
    stages: "flex gap-2 text-light-font-lightV1 dark:text-dark-font-lightV1",
    stageLink: "w-fit",
    openIcon: "cursor-pointer",
    stageLinkBtn:
      "cursor-pointer bg-gradient-to-r from-light-primary-primary to-light-primary-secondary py-1 px-3 w-fit",
    addCampaignBtn:
      "w-fit text-light-font-lightV1 dark:text-dark-font-lightV1 ml-2 rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary px-1 py-1",
    linkBtn: "w-fit",
    shareBtnDiv: "text-light-font-lightV1 dark:text-dark-font-lightV1 ml-2",
    btnShare:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnShareContainer:
      "flex h-full w-full items-center justify-center bg-[#FFFFFF] dark:bg-dark-background dark:text-dark-font-lightV1 rounded-full px-8 py-2",
    shareNow: "text-light-font-lightV1 dark:text-dark-font-lightV1 p-0 m-0",
    heading: "mt-12",
  };
  return (
    <>
      <div className={`${commonStyles.heading} ${style.heading}`}>
        <p>{campaign?.name}</p>
      </div>
      <div className={style.campaignDiv}>
        <div className={style.mainCampaign}>
          <div className={style.campaignImageContainer}>
            <div className={style.campaignCategory}>
              {campaign?.category && (
                <p className={style.category}>{campaign.category}</p>
              )}
            </div>
            {/* TODO: get cross origin error solution */}
            <div
              className={style.campaingImage}
              style={{
                backgroundImage: `url(${campaign?.mediaLinks[mediaLinkIdx]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className={style.carouselArrows}>
        <div
          className={style.carouselLeft}
          onClick={() => {
            prevItem();
          }}
        >
          {"<"}
        </div>
        <div
          className={style.carouselLeft}
          onClick={() => {
            nextItem();
          }}
        >
          {">"}
        </div>
      </div>
      <div className={style.shareBtnDiv}>
        <div className={style.btnShare} onClick={copyLink}>
          <div className={style.btnShareContainer}>
            <p>Share</p>
          </div>
        </div>
      </div>
      <div className={commonStyles.paragraph}>
        <p>{campaign?.description}</p>
      </div>
      <div className={commonStyles.paragraph}>
        <AiOutlineGlobal />
        <p>{campaign?.websiteLink}</p>
        <RiShareBoxFill
          className={style.openIcon}
          onClick={() => {
            `${window.open(campaign?.websiteLink)}`;
          }}
        />
      </div>
      <div className={`${commonStyles.heading} ${style.heading}`}>
        <p>Token Address</p>
      </div>
      <div className={commonStyles.paragraph}>
        <FaEthereum />
        <p>{campaign?.tokenAddress}</p>
      </div>
      <div className={`${style.stageDetails} ${style.allStages}`}>
        <p>Stages</p>
        {address === campaign?.owner && (
          <Link to="stage/add" className={style.linkBtn}>
            <div className={style.addCampaignBtn}>
              <MdAdd />
            </div>
          </Link>
        )}
      </div>
      <div className={style.stages}>
        {allStages && allStages.length > 0
          ? allStages.map((res, idx) => {
              return (
                <Link
                  to={`stage/${res.address}`}
                  className={`${style.stageLink} ${style.stageLinkBtn}`}
                  key={idx}
                >
                  <p>{idx + 1}</p>
                </Link>
              );
            })
          : null}
      </div>
      <div className={style.stageDetails}>
        <p>Recent Campaigns</p>
      </div>
      {/* TODO: The below should all be in one control so that it can be reused. */}
      <div className={`${style.allCampaigns} campaignsMain`}>
        {campaigns &&
          campaigns.map((item, i) => {
            return (
              <CampaignList
                key={i}
                name={item.name}
                description={item.description}
                logoLink={item.logoLink}
                websiteLink={item.websiteLink}
                mediaLinks={item.mediaLinks}
                tokenAddress={item.tokenAddress}
                campaignKey={item.campaignKey}
                stageCount={item.stageCount}
                owner={item.owner}
                category={item.category}
              />
            );
          })}
      </div>
    </>
  );
};

export default SingleCampaign;
