import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useStageAddVoteHandler } from "../../hooks/useStageAddVoteHandler";

type ConnectorModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  maxVoteWeight: number | undefined;
  stageAddress: string;
  showVotingBtn: boolean;
};

const StageAddVote = ({
  isOpen,
  setIsOpen,
  maxVoteWeight,
  stageAddress,
  showVotingBtn,
}: ConnectorModalProps) => {
  const { submitUserVote, setUserVote, voteBtnDisable, closeModal } =
    useStageAddVoteHandler(stageAddress, showVotingBtn, setIsOpen);
  const style = {
    dialog: "z-[1000] relative",
    overlay: "fixed inset-0 bg-black/50",
    dialogMain: "fixed inset-0 overflow-y-auto",
    dialogDiv: "flex min-h-full items-center justify-center p-4 text-center",
    dialogPanel:
      "w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-dark-box p-6 text-left align-middle shadow-xl transition-all",
    dialogHeading:
      "text-lg font-bold leading-6 text-light-font-lightV1 dark:text-dark-font-lightV1",
    dialogBody: "mt-4",
    voteForm:
      "flex flex-col text-sm text-light-font-lightV1 dark:text-dark-font-lightV1 mb-4",
    voteText: "text-sm",
    radioContainer: "flex items-center mt-4",
    radioDiv: "flex rounded-lg",
    radioBtn: "radio text-center py-2 px-4 cursor-pointer",
    inProgressBtn: "rounded-l-lg",
    completedBtn: "rounded-r-lg",
    categoriesBtnDiv: "text-light-font-lightV1 w-full flex justify-end mt-4",
    btnCategories:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnCategoriesContainerActive:
      "flex h-full items-center justify-center text-light-font-lightV2 back rounded-full px-6 py-2",
    disableBtn: "pointer-events-none",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={closeModal} className={style.dialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={style.overlay}></div>
        </Transition.Child>
        <div className={style.dialogMain}>
          <div className={style.dialogDiv}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={style.dialogPanel}>
                <Dialog.Title className={style.dialogHeading} as="h3">
                  Add your Vote
                </Dialog.Title>
                <div className={style.dialogBody}>
                  <div className={style.voteForm}>
                    <div className={style.voteText}>
                      Has the project met the stage deliverables?
                    </div>
                    <div>
                      {maxVoteWeight
                        ? "(Note: max vote weight is " +
                          (maxVoteWeight * 100) / 100000 +
                          "%)"
                        : ""}
                    </div>
                    <div className={style.radioContainer}>
                      <div className={style.radioDiv}>
                        <input
                          type="radio"
                          name="room_type"
                          id="inProgress"
                          onChange={() => {
                            setUserVote(true);
                          }}
                          readOnly
                          hidden
                        />
                        <label
                          htmlFor="inProgress"
                          className={`${style.radioBtn} ${style.inProgressBtn}`}
                        >
                          Yes
                        </label>
                      </div>
                      <div className={style.radioDiv}>
                        <input
                          type="radio"
                          name="room_type"
                          id="completed"
                          onChange={() => {
                            setUserVote(false);
                          }}
                          readOnly
                          hidden
                        />
                        <label
                          htmlFor="completed"
                          className={`${style.radioBtn} ${style.completedBtn}`}
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={style.categoriesBtnDiv}>
                      <div
                        className={`${style.btnCategories} ${
                          voteBtnDisable ? style.disableBtn : ""
                        }`}
                        onClick={submitUserVote}
                      >
                        <div className={style.btnCategoriesContainerActive}>
                          <p>Submit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StageAddVote;
