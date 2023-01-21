import React from "react";
import Add from "../../../assets/add.svg";

function AddCampaign() {
  const style = {
    campaignDiv: "text-font-lightV1 mt-4 w-full",
    mainCampaign:
      "rounded-md bg-gradient-to-r from-white to-white p-[2px] w-full drop-shadow-xl",
    signleCampaignContainer:
      "w-full flex flex-col h-full bg-gradient-to-b from-[#9A9A9A]/20 to-[#9A9A9A]/10 back rounded-md px-6 pt-10",
    inputDiv: "relative border-b-2 focus-within:border-blue-500 w-full",
    mainInput: "block w-full appearance-none focus:outline-none bg-transparent",
    inputLabel: "absolute top-0 -z-1 duration-300 origin-0",
    mediaLinksHeading: "text-2xl font-bold mb-8",
    mediaLinksContainer: "flex justify-between items-center gap-4",
    linkAdd: "w-4 cursor-pointer",
    inputMargin: "mb-8",
    campaignHeading: "mt-12 text-2xl font-bold w-full",
    categoriesBtnDiv: "text-font-lightV1 w-full flex justify-end mb-8",
    btnCategories:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-primary-primary to-primary-secondary p-[2px]",
    btnCategoriesContainerActive:
      "flex h-full items-center justify-center text-font-lightV2 back rounded-full px-6 py-2",
  };
  return (
    <>
      <div className={"createCampaignMainContainer"}>
        <div className={style.campaignHeading}>
          <p>Create a Campaign</p>
        </div>
        <div className={style.campaignDiv}>
          <div className={style.mainCampaign}>
            <div className={style.signleCampaignContainer}>
              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="websiteLink"
                  placeholder=" "
                  className={style.mainInput}
                />
                <label htmlFor="websiteLink" className={style.inputLabel}>
                  Website Link
                </label>
              </div>
              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="logoLink"
                  placeholder=" "
                  className={style.mainInput}
                />
                <label htmlFor="logoLink" className={style.inputLabel}>
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
                  />
                  <label htmlFor="mediaLink" className={style.inputLabel}>
                    Media Link
                  </label>
                </div>
                <div>
                  <img src={Add} alt="add" className={style.linkAdd} />
                </div>
              </div>

              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="tokenAddress"
                  placeholder=" "
                  className={style.mainInput}
                />
                <label htmlFor="tokenAddress" className={style.inputLabel}>
                  Token Address
                </label>
              </div>

              <div className={style.categoriesBtnDiv}>
                <div className={style.btnCategories}>
                  <div className={style.btnCategoriesContainerActive}>
                    <p>Submit</p>
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
