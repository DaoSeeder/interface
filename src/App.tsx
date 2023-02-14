import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Campaigns from "./components/Campaigns";
import AddCampaign from "./components/Campaigns/AddCampaign";
import SingleCampaign from "./components/Campaigns/SingleCampaign";
import Header from "./components/Header";
import Home from "./components/Home";
import IpfsUpload from "./components/IpfsUpload";
import Stage from "./components/Stages";
import AddStage from "./components/Stages/AddStage";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const style = {
    wrapper:
      "w-full flex flex-row justify-center dark:bg-dark-background min-h-screen items-start",
    container: "flex flex-col justify-center mt-6 w-full",
    allRoutes: "px-[200px]",
  };

  useEffect(() => {
    if (
      (localStorage.theme && localStorage.theme === "dark") ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <Toaster />
      <ThemeSwitcher />
      <div className={style.container}>
        <Router>
          <Header />
          <div className={`${style.allRoutes} allRoutes`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaign/:id" element={<SingleCampaign />} />
              <Route path="/campaign/add" element={<AddCampaign />} />
              <Route path="/campaign/:id/stage/:stageId" element={<Stage />} />
              <Route path="/campaign/:id/stage/add" element={<AddStage />} />
              <Route path="/ipfs" element={<IpfsUpload />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
