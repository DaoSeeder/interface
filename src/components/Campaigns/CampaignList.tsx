import React from "react";
import { Link } from "react-router-dom";
import { ICampaign } from "../../interfaces/ICampaign";

const CampaignList = ({
  name,
  description,
  logoLink,
  campaignKey,
  category,
}: ICampaign) => {
  const style = {
    campaignDiv: "text-light-font-lightV1 dark:text-dark-font-lightV1 h-full",
    singleCampaign:
      "cursor-pointer w-full rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] drop-shadow-xl h-full",
    singleCampaignContainer:
      "flex flex-col h-full bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 py-2",
    campaignName: "flex flex-row justify-between mt-4 w-full",
    campaignTitle: "font-bold",
    campaignCategory: "text-xs w-full flex justify-end",
    category: "capitalize bg-light-primary-primary p-1 text-dark-font-lightV1",
    campaignMoney: "text-sm",
    campaignMoneyRaised: "text-xs",
    campaignTime: "text-sm",
    campaignTimeLeft: "text-xs",
    campaingDesc: "text-sm my-4",
    campaignData: "flex justify-between w-full mb-4",
    link: "w-full h-full",
    imageStyle: "h-[250px] flex justify-center items-center",
  };
  return (
    <Link to={`/campaign/${campaignKey}`} className={style.link}>
      <div className={style.campaignDiv}>
        <div className={style.singleCampaign}>
          <div className={style.singleCampaignContainer}>
            <div className={style.campaignCategory}>
              {category && <p className={style.category}>{category}</p>}
            </div>
            <div
              className={style.imageStyle}
              style={{
                backgroundImage: `url(${logoLink})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></div>
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
};

export default CampaignList;
