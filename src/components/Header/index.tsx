import React from "react";

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

  return (
    <div className={style.wrapper}>
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
      <div className={style.connectBtnDiv}>
        <div className={style.btnConnect}>
          <div className={style.btnConnectContainer}>
            <p>Connect Wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
