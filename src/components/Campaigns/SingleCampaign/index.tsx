import React from "react";
import CampaignImage from "../../../assets/campaign1.jpg";
import Image1 from "../../../assets/image_1.png";
import Image2 from "../../../assets/image_2.png";
import Image3 from "../../../assets/image_3.png";
import Link from "../../../assets/link.png";
import Globe from "../../../assets/globe.png";
import EthLogo from "../../../assets/eth_logo.png";

function SingleCampaign() {
  const style = {
    campaignDiv: "text-font-lightV1 mt-12 w-full",
    mainCampaign:
      "rounded-md bg-gradient-to-r from-white to-white p-[2px] w-full drop-shadow-xl",
    signleCampaign:
      "rounded-md bg-gradient-to-r from-white to-white p-[2px] drop-shadow-xl",
    campaignImageContainer:
      "flex flex-col w-[910px] h-full items-center justify-center bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 back rounded-md px-6 py-2",
    signleCampaignContainer:
      "flex flex-col w-full h-full items-center justify-center bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 back rounded-md px-6 py-2",
    campaignName: "flex flex-row justify-between mt-4 w-full items-center",
    campaignTitle: "font-bold",
    campaignCategory: "text-xs",
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
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-primary-primary to-primary-secondary py-1 px-3 text-font-lightV2 font-bold text-lg",
    campaignDetails: "font-bold text-2xl text-font-lightV1 mt-12",
    stageDetails: "font-bold text-2xl text-font-lightV1 mt-12 mb-4",
    campaignWebsite: "flex items-center gap-4 mt-4",
    globe: "w-[20px]",
    link: "w-[10px] cursor-pointer",
    eachStage: "flex gap-4 items-center font-semibold",
    stages: "flex flex-col gap-2",
    stageLink: "w-[10px]",
  };
  return (
    <>
      <div className={style.campaignDiv}>
        <div className={style.mainCampaign}>
          <div className={style.campaignImageContainer}>
            <div
              className={style.campaingImage}
              style={{
                backgroundImage: `url(${CampaignImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className={style.carouselArrows}>
        <div className={style.carouselLeft}>{"<"}</div>
        <div className={style.carouselLeft}>{">"}</div>
      </div>
      <div className={style.campaignDetails}>
        <p>Campaign Details</p>
      </div>
      <div className={style.campaignWebsite}>
        <img src={Globe} alt={"Globe"} className={style.globe} />
        <p>https://www.daoseeder.com</p>
        <img src={Link} alt={"link"} className={style.link} />
      </div>
      <div className={style.campaignDetails}>
        <p>Token Address</p>
      </div>
      <div className={style.campaignWebsite}>
        <img src={EthLogo} alt={"EthLogo"} className={style.globe} />
        <p>
          0x2f7f8cab3db5bf32e433075bb7eeecfdb2f383d40078750ee4739c5f9b25894e
        </p>
      </div>
      <div className={style.stageDetails}>
        <p>Stages</p>
      </div>
      <div className={style.stages}>
        <div className={style.eachStage}>
          <p>First Stage</p>
          <img src={Link} alt={"link"} className={style.stageLink} />
        </div>
        <div className={style.eachStage}>
          <p>Second Stage</p>
          <img src={Link} alt={"link"} className={style.stageLink} />
        </div>
        <div className={style.eachStage}>
          <p>Third Stage</p>
          <img src={Link} alt={"link"} className={style.stageLink} />
        </div>
      </div>
      <div className={style.stageDetails}>
        <p>More Campaigns</p>
      </div>
      {/* TODO: Once we are getting the data from blockchain we will convert it into its own component */}
      <div className={`${style.allCampaigns} campaignsMain`}>
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
}

export default SingleCampaign;
