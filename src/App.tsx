import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCampaign from "./components/Campaigns/AddCampaign";
import SingleCampaign from "./components/Campaigns/SingleCampaign";
import Header from "./components/Header";
import Home from "./components/Home";
import Stage from "./components/Stages";
import AddStage from "./components/Stages/AddStage";
import { BsMoonFill } from "react-icons/bs";
import { BiSun } from "react-icons/bi";

function App() {
  const style = {
    wrapper:
      "w-full flex flex-row justify-center max-w-screen-2xl px-[200px] dark:bg-dark-background min-h-screen items-start",
    container: "flex flex-col justify-center mt-6",
    themeIcon: "text-xl m-2",
    themeIconMoonLight: "text-xl m-2 text-light-font-lightV2",
    themeContainer:
      "fixed bottom-2 right-2 flex justify-between items-center bg-light-primary-grey dark:bg-white py-1 px-2 rounded-[30px] z-50",
    iconDiv: "cursor-pointer",
  };

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("theme") &&
      localStorage.getItem("theme") === "dark"
    ) {
      setIsDark(true);
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      const elem = document.getElementById("moonDiv");
      if (elem !== null) {
        elem.classList.add("bg-black");
        elem.classList.add("rounded-3xl");
        elem.classList.add("text-white");
      }
    } else {
      setIsDark(false);
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      const elem = document.getElementById("sunDiv");
      if (elem !== null) {
        elem.classList.add("bg-white");
        elem.classList.add("rounded-3xl");
        elem.classList.add("text-black");
      }
    }
  }, []);

  const changeTheme = (theme: string) => {
    if (theme === "light") {
      setIsDark(false);
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      const elem = document.getElementById("sunDiv");
      if (elem !== null) {
        elem.classList.add("bg-white");
        elem.classList.add("rounded-3xl");
        elem.classList.add("text-black");
      }
      const elem2 = document.getElementById("moonDiv");
      if (elem2 !== null) {
        elem2.classList.remove("bg-black");
        elem2.classList.remove("rounded-3xl");
        elem2.classList.remove("text-white");
      }
    } else {
      setIsDark(true);
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      const elem = document.getElementById("moonDiv");
      if (elem !== null) {
        elem.classList.add("bg-black");
        elem.classList.add("rounded-3xl");
        elem.classList.add("text-white");
      }
      const elem2 = document.getElementById("sunDiv");
      if (elem2 !== null) {
        elem2.classList.remove("bg-white");
        elem2.classList.remove("rounded-3xl");
        elem2.classList.remove("text-black");
      }
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.themeContainer}>
        <div
          id="sunDiv"
          className={style.iconDiv}
          onClick={() => {
            changeTheme("light");
          }}
        >
          <BiSun className={style.themeIcon} />
        </div>
        <div
          id="moonDiv"
          className={style.iconDiv}
          onClick={() => {
            changeTheme("dark");
          }}
        >
          <BsMoonFill
            className={`${isDark ? style.themeIcon : style.themeIconMoonLight}`}
          />
        </div>
      </div>
      <div className={style.container}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaign/:id" element={<SingleCampaign />} />
            <Route path="/campaign/add" element={<AddCampaign />} />
            <Route path="/campaign/:id/stage/:stageId" element={<Stage />} />
            <Route path="/campaign/:id/stage/add" element={<AddStage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
