import React, { useState } from "react";
import { useDisconnect, useAccount } from "wagmi";
import ConnectorsModal from "./ConnectorsModal";
import UserWallet from "./UserWallet";

const Header = () => {
  const style = {
    wrapper: "flex justify-between items-center",
    headerHeading: "text-2xl font-bold text-primary-primary",
    headerLinks: "flex justify-between items-center",
    headerItem: "mx-6 font-bold cursor-pointer",
    navItem: "text-font-lightV1",
    activeNavItem: "text-primary-primary",
    connectBtnDiv: "text-font-lightV1",
    btnConnect:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-primary-primary to-primary-secondary p-[2px]",
    btnConnectContainer:
      "flex h-full w-full items-center justify-center bg-white back rounded-full px-8 py-2",
  };

  const [isOpen, setIsOpen] = useState(false);

  const { isConnected } = useAccount();

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const { disconnect } = useDisconnect();

  return (
    <div className={style.wrapper}>
      <ConnectorsModal isOpen={isOpen} closeModal={closeModal} />
      <div>
        <h1 className={style.headerHeading}>DaoSeeder</h1>
      </div>
      <div className={style.headerLinks}>
        <div
          className={`${style.headerItem} ${
            location.pathname === "/" ? style.activeNavItem : style.navItem
          }`}
        >
          <p>Home</p>
        </div>
        <div
          className={`${style.headerItem} ${
            location.pathname === "/marketplace"
              ? style.activeNavItem
              : style.navItem
          }`}
        >
          <p>Campaigns</p>
        </div>
        <div
          className={`${style.headerItem} ${
            location.pathname === "/community"
              ? style.activeNavItem
              : style.navItem
          }`}
        >
          <p>Community</p>
        </div>
        <div
          className={`${style.headerItem} ${
            location.pathname === "/contact"
              ? style.activeNavItem
              : style.navItem
          }`}
        >
          <p>Contact</p>
        </div>
      </div>
      {isConnected ? (
        <div>
          <UserWallet disconnectWallet={disconnect} />
        </div>
      ) : (
        // <div
        //   onClick={() => {
        //     disconnect();
        //   }}
        // >
        //   <div
        //     className={style.connectBtnDiv}
        //     onClick={() => {
        //       disconnect();
        //     }}
        //   >
        //     <div className={style.btnConnect}>
        //       <div className={style.btnConnectContainer}>
        //         <p>
        //           {address ? truncateAddress(address.toString()) : null} | v
        //         </p>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div className={style.connectBtnDiv} onClick={openModal}>
          <div className={style.btnConnect}>
            <div className={style.btnConnectContainer}>
              <p>Connect Wallet</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
