import React from "react";
import { AiOutlineLoading, AiOutlineMinusCircle } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { useCampaignsHandler } from "../../../hooks/useCampaignsHandler";

function AddCampaign() {
  const {
    campaignMediaLinks,
    addMediaLinks,
    setCampaignLink,
    removeMediaLinks,
    setCampaignName,
    setCampaignLogoLink,
    setCampaignDescription,
    setCampaignWebsiteLink,
    setCampaignTokenAddress,
    addCampaign,
    disableBtn,
    campaignLink,
  } = useCampaignsHandler();
  const style = {
    campaignDiv: "text-light-font-lightV1 mt-4 w-full",
    mainCampaign:
      "rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] w-full drop-shadow-xl",
    singleCampaignContainer:
      "w-full flex flex-col h-full bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 dark:from-dark-box dark:to-dark-box rounded-md px-6 pt-10 -z-10 relative",
    inputDiv:
      "relative border-b-2 focus-within:border-blue-500 w-full dark:text-dark-font-lightV1",
    mainInput:
      "block w-full appearance-none focus:outline-none bg-transparent dark:text-dark-font-lightV1",
    inputLabel:
      "dark:text-dark-font-muted absolute top-0 -z-1 duration-300 origin-0",
    mediaLinksHeading: "text-2xl font-bold mb-8 dark:text-dark-font-lightV1",
    mediaLinksContainer: "flex justify-between items-center gap-4",
    linkAdd: "w-4 cursor-pointer dark:text-dark-font-lightV2",
    inputMargin: "mb-8",
    campaignHeading:
      "mt-12 text-2xl font-bold w-full dark:text-dark-font-lightV2",
    categoriesBtnDiv: "text-light-font-lightV1 w-full flex justify-end mb-8",
    btnCategories: "cursor-pointer w-fit rounded-full p-[2px]",
    btnCategoriesContainerActive:
      "flex h-full items-center justify-center text-light-font-lightV2 back rounded-full px-6 py-2",
    allMediaLinks: "mb-8",
    singleMedia: "flex justify-between w-full dark:text-dark-font-lightV1 mb-2",
    eachMedia: "border-b-2 w-full mr-4",
    disableBtn: "pointer-events-none bg-disabled",
    enableBtn:
      "bg-gradient-to-r from-light-primary-primary to-light-primary-secondary",
  };
  return (
    <>
      <div className={"createCampaignMainContainer"}>
        <div className={style.campaignHeading}>
          <p>Create a Campaign</p>
        </div>
        <div className={style.campaignDiv}>
          <div className={style.mainCampaign}>
            <div className={style.singleCampaignContainer}>
              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="campaignName"
                  placeholder=" "
                  className={style.mainInput}
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                  }}
                />
                <label
                  id="inputLabel"
                  htmlFor="campaignName"
                  className={style.inputLabel}
                >
                  Camapign Name
                </label>
              </div>
              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="campaignDescription"
                  placeholder=" "
                  className={style.mainInput}
                  onChange={(e) => {
                    setCampaignDescription(e.target.value);
                  }}
                />
                <label
                  id="inputLabel"
                  htmlFor="campaignDescription"
                  className={style.inputLabel}
                >
                  Campaign Description
                </label>
              </div>
              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="websiteLink"
                  placeholder=" "
                  className={style.mainInput}
                  onChange={(e) => {
                    setCampaignWebsiteLink(e.target.value);
                  }}
                />
                <label
                  id="inputLabel"
                  htmlFor="websiteLink"
                  className={style.inputLabel}
                >
                  Website Link
                </label>
              </div>
              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="logoLink"
                  placeholder=" "
                  className={style.mainInput}
                  onChange={(e) => {
                    setCampaignLogoLink(e.target.value);
                  }}
                />
                <label
                  id="inputLabel"
                  htmlFor="logoLink"
                  className={style.inputLabel}
                >
                  Logo Link
                </label>
              </div>
              <div className={style.mediaLinksHeading}>
                <p>Media Links</p>
              </div>
              <div
                className={`${style.mediaLinksContainer} ${style.inputMargin}`}
              >
                <div className={`${style.inputDiv}`}>
                  <input
                    type="text"
                    name="mediaLink"
                    placeholder=" "
                    className={style.mainInput}
                    value={campaignLink}
                    onChange={(e) => {
                      setCampaignLink(e.target.value);
                    }}
                  />
                  <label
                    id="inputLabel"
                    htmlFor="mediaLink"
                    className={style.inputLabel}
                  >
                    Media Link
                  </label>
                </div>
                <div
                  onClick={() => {
                    addMediaLinks();
                  }}
                >
                  <MdAddCircleOutline className={style.linkAdd} />
                </div>
              </div>

              <div className={style.allMediaLinks}>
                {campaignMediaLinks &&
                  campaignMediaLinks.map((res, idx) => {
                    return (
                      <div key={idx} className={style.singleMedia}>
                        <p className={style.eachMedia}>{res}</p>

                        <div
                          onClick={() => {
                            removeMediaLinks(idx);
                          }}
                        >
                          <AiOutlineMinusCircle className={style.linkAdd} />
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="tokenAddress"
                  placeholder=" "
                  className={style.mainInput}
                  onChange={(e) => {
                    setCampaignTokenAddress(e.target.value);
                  }}
                />
                <label
                  id="inputLabel"
                  htmlFor="tokenAddress"
                  className={style.inputLabel}
                >
                  Token Address
                </label>
              </div>

              <div className={style.categoriesBtnDiv}>
                <div
                  className={`${style.btnCategories} ${
                    disableBtn ? style.disableBtn : style.enableBtn
                  }`}
                  onClick={() => {
                    addCampaign();
                  }}
                >
                  <div className={style.btnCategoriesContainerActive}>
                    {disableBtn ? (
                      <AiOutlineLoading className="animate-spin w-12 h-6" />
                    ) : (
                      <p>Submit</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCampaign;
