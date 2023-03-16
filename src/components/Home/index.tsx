import React from "react";
import Galaxy from "../../assets/galaxy.png";
import CampaignList from "../Campaigns/CampaignList";
import { useCampaignsHandler } from "../../hooks/useCampaignsHandler";
import { Link } from "react-router-dom";

const Home = () => {
  const { campaigns } = useCampaignsHandler();
  const style = {
    learnMoreBtnDiv: "text-light-font-lightV1",
    btnLearnMore:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnLearnMoreContainer:
      "flex h-full items-center justify-center bg-white dark:bg-dark-background dark:text-dark-font-lightV1 rounded-full px-10 py-2 font-bold",
    banner:
      "flex flex-col justify-center items-center h-[550px] text-center relative",
    bannerHeading:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 font-bold text-[66px] leading-[90px] mb-8 z-[10]",
    bannerImg:
      "absolute z-[0] right-[-10rem] w-[600px] top-[9rem] dark:opacity-80",
    campaignsDiv: "flex flex-col mt-40",
    campaignHeading:
      "text-center text-3xl text-light-font-lightV1 dark:text-dark-font-lightV1 font-bold",
    campaignCategories: "flex items-center mt-12 justify-center gap-8",
    browse: "font-bold dark:text-dark-font-lightV1",
    categoriesBtnDiv: "text-light-font-lightV1",
    btnCategories:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnCategoriesContainer:
      "flex h-full items-center justify-center bg-white dark:bg-dark-background dark:text-dark-font-lightV1 rounded-full px-6 py-2",
    btnCategoriesContainerActive:
      "flex h-full items-center justify-center text-light-font-lightV2 back rounded-full px-6 py-2",
    allCampaigns: "my-12",
    campaignDiv: "text-light-font-lightV1 dark:text-dark-font-lightV1",
    singleCampaign:
      "cursor-pointer w-fit rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] drop-shadow-xl",
    singleCampaignContainer:
      "flex flex-col h-full items-center justify-center bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 py-2",
    campaignName: "flex flex-row justify-between mt-4 w-full items-center",
    campaignTitle: "font-bold",
    campaignCategory: "text-xs",
    campaignMoney: "text-sm",
    campaignMoneyRaised: "text-xs",
    campaignTime: "text-sm",
    campaignTimeLeft: "text-xs",
    campaingDesc: "text-sm my-4",
    campaignData: "flex justify-between w-full mb-4",
  };

  return (
    <>
      <div className={style.banner}>
        <img src={Galaxy} alt="SolarSystem" className={style.bannerImg} />
        <div className={style.bannerHeading}>
          <p>World&apos;s first decentralized Crowdfunding platform</p>
        </div>
        <Link to="/learn">
          <div className={style.btnLearnMore}>
            <div className={style.btnLearnMoreContainer}>
              <p>Learn More</p>
            </div>
          </div>
        </Link>
      </div>
      <div className={style.campaignsDiv}>
        <h1 className={style.campaignHeading}>Recent Campaigns</h1>
        <div className={style.campaignCategories}>
          <div className={style.browse}>
            <p>Browse</p>
          </div>
          <div className={style.categoriesBtnDiv}>
            <div className={style.btnCategories}>
              <div className={style.btnCategoriesContainerActive}>
                <p>All</p>
              </div>
            </div>
          </div>
          <div className={style.categoriesBtnDiv}>
            <div className={style.btnCategories}>
              <div className={style.btnCategoriesContainer}>
                <p>eCommerce</p>
              </div>
            </div>
          </div>
          <div className={style.categoriesBtnDiv}>
            <div className={style.btnCategories}>
              <div className={style.btnCategoriesContainer}>
                <p>Business</p>
              </div>
            </div>
          </div>
          <div className={style.categoriesBtnDiv}>
            <div className={style.btnCategories}>
              <div className={style.btnCategoriesContainer}>
                <p>Blog</p>
              </div>
            </div>
          </div>
          <div className={style.categoriesBtnDiv}>
            <div className={style.btnCategories}>
              <div className={style.btnCategoriesContainer}>
                <p>Non-Profit</p>
              </div>
            </div>
          </div>
          <div className={style.categoriesBtnDiv}>
            <div className={style.btnCategories}>
              <div className={style.btnCategoriesContainer}>
                <p>Personal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              />
            );
          })}
      </div>
    </>
  );
};

export default Home;
