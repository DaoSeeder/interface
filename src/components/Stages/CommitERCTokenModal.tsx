import React, { Dispatch, SetStateAction, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ConnectorModalProps = {
  isOpen: boolean;
  closeModal: (value?: boolean) => void;
  commitERCAmount: () => Promise<void>;
  setERCAmount: Dispatch<SetStateAction<number>>;
  ercBtnDisable: boolean;
};

const CommitERCTokenModal = ({
  isOpen,
  closeModal,
  commitERCAmount,
  setERCAmount,
  ercBtnDisable,
}: ConnectorModalProps) => {
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
    stageProgress:
      "flex flex-col text-sm text-light-font-lightV1 dark:text-dark-font-lightV1 mb-4",
    stageProgressLabel: "mt-4",
    radioContainer: "flex items-center mt-2",
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
    inputDiv:
      "relative border-b-2 focus-within:border-blue-500 w-full dark:text-dark-font-lightV1 mb-2",
    mainInput:
      "block w-full appearance-none focus:outline-none bg-transparent dark:text-dark-font-lightV1",
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
                  Add token amount
                </Dialog.Title>
                <div className={style.dialogBody}>
                  <div className={style.stageProgress}>
                    <label className={style.stageProgressLabel}>Amount</label>
                    <div className={`${style.inputDiv}`}>
                      <input
                        type="number"
                        name="stageERC"
                        placeholder=" "
                        className={style.mainInput}
                        onChange={(e) => {
                          setERCAmount(parseFloat(e.target.value));
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={style.categoriesBtnDiv}>
                      <div
                        className={`${style.btnCategories} ${
                          ercBtnDisable ? style.disableBtn : ""
                        }`}
                        onClick={commitERCAmount}
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

export default CommitERCTokenModal;
