import React from "react";
import { BsMoonFill } from "react-icons/bs";
import { BiSun } from "react-icons/bi";

function ThemeSwitcher() {
  const style = {
    themeIcon: "text-xl m-2",
    themeIconMoon: "text-xl m-2 text-light-font-lightV2",
    themeContainer:
      "fixed bottom-2 right-2 flex justify-between items-center bg-black dark:bg-white py-1 px-2 rounded-[30px] z-50",
    sunDiv:
      "dark:bg-transparent bg-white dark:rounded-none rounded-3xl text-black cursor-pointer",
    moonDiv:
      "bg-transparent dark:bg-black rounded-none dark:rounded-3xl text-white cursor-pointer",
  };
  const changeTheme = (theme: string) => {
    if (theme === "light") {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className={style.themeContainer}>
      <div
        className={style.sunDiv}
        onClick={() => {
          changeTheme("light");
        }}
      >
        <BiSun className={style.themeIcon} />
      </div>
      <div
        className={style.moonDiv}
        onClick={() => {
          changeTheme("dark");
        }}
      >
        <BsMoonFill className={style.themeIconMoon} />
      </div>
    </div>
  );
}

export default ThemeSwitcher;
