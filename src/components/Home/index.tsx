import React from "react";
import Galaxy from "../../assets/galaxy.png";
import Image1 from "../../assets/image_1.png";
import Image2 from "../../assets/image_2.png";
import Image3 from "../../assets/image_3.png";

const Home = () => {
  const style = {
    learnMoreBtnDiv: "text-font-lightV1",
    btnLearnMore:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-primary-primary to-primary-secondary p-[2px]",
    btnLearnMoreContainer:
      "flex h-full items-center justify-center bg-white back rounded-full px-10 py-2 font-bold",
    banner: "flex flex-col justify-center items-center h-[550px] text-center",
    bannerHeading:
      "text-font-lightV1 font-bold text-[66px] leading-[90px] mb-8",
    bannerImg: "absolute z-[-1] right-[-10rem] w-[600px] top-[10rem]",
    campaignsDiv: "flex flex-col mt-24",
    campaignHeading: "text-center text-3xl text-font-lightV1 font-bold",
    campaignCategories: "flex items-center mt-12 justify-between",
    browse: "font-bold",
    categoriesBtnDiv: "text-font-lightV1",
    btnCategories:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-primary-primary to-primary-secondary p-[2px]",
    btnCategoriesContainer:
      "flex h-full items-center justify-center bg-white back rounded-full px-6 py-2",
    btnCategoriesContainerActive:
      "flex h-full items-center justify-center text-font-lightV2 back rounded-full px-6 py-2",
    allCampaigns: "flex justify-between my-12",
    campaignDiv: "text-font-lightV1",
    signleCampaign:
      "cursor-pointer w-fit rounded-md bg-gradient-to-r from-white to-white p-[2px] w-[300px] drop-shadow-xl",
    signleCampaignContainer:
      "flex flex-col h-full items-center justify-center bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 back rounded-md px-6 py-2",
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
        <div className={style.learnMoreBtnDiv}>
          <div className={style.btnLearnMore}>
            <div className={style.btnLearnMoreContainer}>
              <p>Learn More</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.campaignsDiv}>
        <h1 className={style.campaignHeading}>Discover Campaigns</h1>
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
      {/* TODO: Once we are getting the data from blockchain we will convert it into its own component */}
      <div className={style.allCampaigns}>
        <div className={style.campaignDiv}>
          <div className={style.signleCampaign}>
            <div className={style.signleCampaignContainer}>
              <img src={Image1} alt={"img1"} />
              <div className={style.campaignName}>
                <p className={style.campaignTitle}>CoinCommerce</p>
                <p className={style.campaignCategory}>eCommerce</p>
              </div>
              <div className={style.campaingDesc}>
                <p>
                  We are creating an ecommerce website to promote our product
                </p>
              </div>
              <div className={style.campaignData}>
                <p className={style.campaignMoney}>
                  $40 <span className={style.campaignMoneyRaised}>raised</span>
                </p>
                <p className={style.campaignTime}>
                  4h 30m <span className={style.campaignTimeLeft}>left</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.campaignDiv}>
          <div className={style.signleCampaign}>
            <div className={style.signleCampaignContainer}>
              <img src={Image2} alt={"img2"} />
              <div className={style.campaignName}>
                <p className={style.campaignTitle}>Crypto Bank</p>
                <p className={style.campaignCategory}>Business</p>
              </div>
              <div className={style.campaingDesc}>
                <p>
                  This is a banking application where the user can manage their
                  funds and can ...
                </p>
              </div>
              <div className={style.campaignData}>
                <p className={style.campaignMoney}>
                  $40 <span className={style.campaignMoneyRaised}>raised</span>
                </p>
                <p className={style.campaignTime}>
                  4h 30m <span className={style.campaignTimeLeft}>left</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.campaignDiv}>
          <div className={style.signleCampaign}>
            <div className={style.signleCampaignContainer}>
              <img src={Image3} alt={"img3"} />
              <div className={style.campaignName}>
                <p className={style.campaignTitle}>Dashboard Block</p>
                <p className={style.campaignCategory}>Personal</p>
              </div>
              <div className={style.campaingDesc}>
                <p>
                  It helps the user to manage their fund with beautiful
                  visualization and..
                </p>
              </div>
              <div className={style.campaignData}>
                <p className={style.campaignMoney}>
                  $40 <span className={style.campaignMoneyRaised}>raised</span>
                </p>
                <p className={style.campaignTime}>
                  4h 30m <span className={style.campaignTimeLeft}>left</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
