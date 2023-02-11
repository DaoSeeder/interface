import React from "react";
import CampaignList from "./CampaignList";
import { useCampaignsHandler } from "../../hooks/useCampaignsHandler";

function Campaigns() {
  const { campaigns, loadMoreCampaigns, totalLen } = useCampaignsHandler();
  const style = {
    allCampaigns: "my-12",
    wrapper: "mt-8",
    campaignHeading:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 text-3xl",
    loadMoreBtn:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 mr-2 rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary px-8 py-3 w-fit cursor-pointer",
    loadMoreBtnDiv: "flex justify-center items-center w-full",
  };

  return (
    <div className={style.wrapper}>
      <div className={style.campaignHeading}>Campaigns</div>
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
              />
            );
          })}
      </div>
      {totalLen > 0 ? (
        <div className={style.loadMoreBtnDiv}>
          <div
            className={style.loadMoreBtn}
            onClick={() => {
              loadMoreCampaigns();
            }}
          >
            Load More
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Campaigns;
