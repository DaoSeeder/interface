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
import Faq from "./components/Faq";
import LearnMore from "./components/LearnMore";
import Faucet from "./components/Faucet";
import Contact from "./components/Contact";

const App = () => {
  const style = {
    wrapper:
      "w-full flex flex-row justify-center max-w-screen-xl dark:bg-dark-background min-h-screen items-start",
    router: "mt-6 w-full",
    allRoutes: "px-[200px] w-full",
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
    <div id="app-wrapper" className={style.wrapper}>
      <Toaster />
      <ThemeSwitcher />
      <Router>
        <div id="router" className={style.router}>
          <Header />
          <div id="routes" className={`${style.allRoutes}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaign/:id" element={<SingleCampaign />} />
              <Route path="/campaign/add" element={<AddCampaign />} />
              <Route path="/campaign/:id/stage/:stageId" element={<Stage />} />
              <Route path="/campaign/:id/stage/add" element={<AddStage />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/ipfs" element={<IpfsUpload />} />
              <Route path="/learn" element={<LearnMore />} />
              <Route path="/faucet" element={<Faucet />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
