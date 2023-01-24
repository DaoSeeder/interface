import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { truncateAddress } from "../../utils/ContractUtils";
import { useAccount } from "wagmi";

interface UserWalletProps {
  disconnectWallet: () => void;
}

const UserWallet = ({ disconnectWallet }: UserWalletProps) => {
  const { address } = useAccount();

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium focus:outline-none">
          <div className="text-font-lightV1">
            <div className="cursor-pointer w-fit rounded-full bg-gradient-to-r from-primary-primary to-primary-secondary p-[2px]">
              <div className="flex h-full w-full items-center justify-center bg-white back rounded-full px-8 py-2">
                {address ? truncateAddress(address.toString()) : null} | v
              </div>
            </div>
          </div>
        </Menu.Button>
        {/* <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {address ? truncateAddress(address.toString()) : null} | v
          </Menu.Button>
        </div> */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      disconnectWallet();
                    }}
                    className={`${
                      active
                        ? "bg-primary-secondary text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
