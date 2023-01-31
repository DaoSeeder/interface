import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDisconnect, useAccount } from "wagmi";
import ConnectorsModal from "./ConnectorsModal";
import UserWallet from "./UserWallet";

const Header = () => {
  const style = {
    wrapper: "flex justify-between items-center px-8",
    headerHeading: "text-2xl font-bold text-light-primary-primary",
    headerLinks: "flex justify-between items-center",
    headerItem: "mx-6 font-bold cursor-pointer",
    navItem: "text-light-font-lightV1 dark:text-dark-font-lightV1",
    activeNavItem: "text-light-primary-primary",
    connectBtnDiv: "text-light-font-lightV1",
    btnConnect:
      "cursor-pointer w-fit rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary p-[2px]",
    btnConnectContainer:
      "flex h-full w-full items-center justify-center bg-white dark:bg-dark-background dark:text-dark-font-lightV1 rounded-full px-8 py-2",
    headerBtns: "flex items-center",
    addCampaignBtn:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 mr-2 rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary px-3 py-3",
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
        <Link to="/">
          <h1 className={style.headerHeading}>DaoSeeder</h1>
        </Link>
      </div>
      <div className={style.headerLinks}>
        <Link to="/">
          <div
            className={`${style.headerItem} ${
              location.pathname === "/" ? style.activeNavItem : style.navItem
            }`}
          >
            <p>Home</p>
          </div>
        </Link>
        <Link to="/campaigns">
          <div
            className={`${style.headerItem} ${
              location.pathname === "/marketplace"
                ? style.activeNavItem
                : style.navItem
            }`}
          >
            <p>Campaigns</p>
          </div>
        </Link>
        <Link to="/community">
          <div
            className={`${style.headerItem} ${
              location.pathname === "/community"
                ? style.activeNavItem
                : style.navItem
            }`}
          >
            <p>Community</p>
          </div>
        </Link>
        <Link to="/contact">
          <div
            className={`${style.headerItem} ${
              location.pathname === "/contact"
                ? style.activeNavItem
                : style.navItem
            }`}
          >
            <p>Contact</p>
          </div>
        </Link>
      </div>
      <div className={style.headerBtns}>
        <Link to="/campaign/add">
          <div className={style.addCampaignBtn}>
            <MdAdd />
          </div>
        </Link>
        {isConnected ? (
          <div>
            <UserWallet disconnectWallet={disconnect} />
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
      </div>
    </div>
  );
};

export default Header;
