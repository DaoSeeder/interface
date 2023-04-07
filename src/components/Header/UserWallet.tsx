import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { truncateAddress } from "../../utils/ContractUtils";
import { useAccount, useDisconnect } from "wagmi";
import { AiFillCaretDown } from "react-icons/ai";
import ConnectorsModal from "./ConnectorsModal";

const UserWallet = () => {
  const style = {
    mainDiv: "text-right",
    menuMain: "relative inline-block text-left",
    menuButton:
      "inline-flex w-full justify-center rounded-md font-medium focus:outline-none",
    btnDiv: "text-light-font-lightV1 dark:text-dark-font-lightV1",
    mainBtn:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    addressBtn:
      "flex h-full w-full items-center justify-center bg-white dark:bg-dark-background rounded-full px-6 py-2",
    menuItem:
      "z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-dark-box shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
    mainMenuItem: "px-1 py-1",
    disconnectBtn:
      "group flex w-full items-center rounded-md px-2 py-2 text-sm",
    activeBtn: "bg-light-primary-secondary text-white",
    inActiveBtn: "text-gray-900 dark:text-white",
    caretDown: "ml-2",
    connectBtnDiv: "text-light-font-lightV1",
    btnConnect:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnConnectContainer:
      "flex h-full w-full items-center justify-center bg-white dark:bg-dark-background dark:text-dark-font-lightV1 rounded-full px-8 py-2",
  };

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [isOpen, setIsOpen] = useState(false);

  const { isConnected } = useAccount();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ConnectorsModal isOpen={isOpen} closeModal={closeModal} />
      {isConnected ? (
        <div className={style.mainDiv}>
          <Menu as="div" className={style.menuMain}>
            <Menu.Button className={style.menuButton}>
              <div className={style.btnDiv}>
                <div className={style.mainBtn}>
                  <div className={style.addressBtn}>
                    {address ? truncateAddress(address.toString()) : null}
                    <span className={style.caretDown}>
                      <AiFillCaretDown />
                    </span>
                  </div>
                </div>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className={style.menuItem}>
                <div className={style.mainMenuItem}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          disconnect();
                        }}
                        className={`${
                          active ? style.activeBtn : style.inActiveBtn
                        } ${style.disconnectBtn}`}
                      >
                        Disconnect
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className={style.connectBtnDiv} onClick={openModal}>
          <div className={style.btnConnect}>
            <div className={style.btnConnectContainer}>
              <p>Connect Wallet</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserWallet;
