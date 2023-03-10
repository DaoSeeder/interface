import React from "react";
import { Link } from "react-router-dom";
import { ICampaign } from "../../interfaces/ICampaign";

function CampaignList({ name, description, logoLink, campaignKey }: ICampaign) {
  const style = {
    campaignDiv: "text-light-font-lightV1 dark:text-dark-font-lightV1",
    singleCampaign:
      "cursor-pointer w-fit rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] drop-shadow-xl",
    singleCampaignContainer:
      "flex flex-col h-full bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 py-2",
    campaignName: "flex flex-row justify-between mt-4 w-full",
    campaignTitle: "font-bold",
    campaignCategory: "text-xs",
    campaignMoney: "text-sm",
    campaignMoneyRaised: "text-xs",
    campaignTime: "text-sm",
    campaignTimeLeft: "text-xs",
    campaingDesc: "text-sm my-4",
    campaignData: "flex justify-between w-full mb-4",
    link: "w-fit h-fit",
    imageStyle: "h-[250px] flex justify-center items-center",
  };
  return (
    <Link to={`/campaign/${campaignKey}`} className={style.link}>
      <div className={style.campaignDiv}>
        <div className={style.singleCampaign}>
          <div className={style.singleCampaignContainer}>
            <div className={style.imageStyle}>
              <img src={logoLink} alt={"img1"} />
            </div>
            <div className={style.campaignName}>
              <p className={style.campaignTitle}>{name}</p>
            </div>
            <div className={style.campaingDesc}>
              <p>{description.slice(0, 160)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CampaignList;
