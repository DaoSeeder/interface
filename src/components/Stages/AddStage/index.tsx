import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

function AddStage() {
  const style = {
    campaignDiv: "text-light-font-lightV1 mt-4 w-full",
    mainCampaign:
      "rounded-md bg-gradient-to-r from-white to-white dark:from-transparent dark:to-transparent p-[2px] w-full drop-shadow-xl",
    signleCampaignContainer:
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
      "mt-12 text-2xl font-bold w-full dark:text-dark-font-lightV1",
    categoriesBtnDiv: "text-light-font-lightV1 w-full flex justify-end mb-8",
    btnCategories:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnCategoriesContainerActive:
      "flex h-full items-center justify-center text-light-font-lightV2 back rounded-full px-6 py-2",
  };
  return (
    <>
      <div className={"createCampaignMainContainer"}>
        <div className={style.campaignHeading}>
          <p>Create a Stage</p>
        </div>
        <div className={style.campaignDiv}>
          <div className={style.mainCampaign}>
            <div className={style.signleCampaignContainer}>
              <div className={`${style.inputDiv} ${style.inputMargin}`}>
                <input
                  type="text"
                  name="stageTitle"
                  placeholder=" "
                  className={style.mainInput}
                />
                <label htmlFor="stageTitle" className={style.inputLabel}>
                  Stage Title
                </label>
              </div>
              <div className={style.mediaLinksHeading}>
                <p>Add Stage Deliverables</p>
              </div>
              <div
                className={`${style.mediaLinksContainer} ${style.inputMargin}`}
              >
                <div className={`${style.inputDiv}`}>
                  <input
                    type="text"
                    name="stageDeliverable"
                    placeholder=" "
                    className={style.mainInput}
                  />
                  <label
                    htmlFor="stageDeliverable"
                    className={style.inputLabel}
                  >
                    Stage Deliverable
                  </label>
                </div>
                <div>
                  <MdAddCircleOutline className={style.linkAdd} />
                </div>
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

export default AddStage;