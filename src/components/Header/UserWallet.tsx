import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { truncateAddress } from "../../utils/ContractUtils";
import { useAccount } from "wagmi";
import { AiFillCaretDown } from "react-icons/ai";

interface UserWalletProps {
  disconnectWallet: () => void;
}

const UserWallet = ({ disconnectWallet }: UserWalletProps) => {
  const style = {
    mainDiv: "text-right",
    menuMain: "relative inline-block text-left",
    menuButton:
      "inline-flex w-full justify-center rounded-md font-medium focus:outline-none",
    btnDiv: "text-font-lightV1",
    mainBtn:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-primary-primary to-primary-secondary p-[2px]",
    addressBtn:
      "flex h-full w-full items-center justify-center bg-white back rounded-full px-6 py-2",
    menuItem:
      "z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
    mainMenuItem: "px-1 py-1",
    disconnectBtn:
      "group flex w-full items-center rounded-md px-2 py-2 text-sm",
    activeBtn: "bg-primary-secondary text-white",
    inActiveBtn: "text-gray-900",
    caretDown: "ml-2",
  };

  const { address } = useAccount();

  return (
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
                      disconnectWallet();
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
  );
};

export default UserWallet;
