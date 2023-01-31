import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCampaign from "./components/Campaigns/AddCampaign";
import SingleCampaign from "./components/Campaigns/SingleCampaign";
import Header from "./components/Header";
import Home from "./components/Home";
import Stage from "./components/Stages";
import AddStage from "./components/Stages/AddStage";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const style = {
    wrapper:
      "w-full flex flex-row justify-center max-w-screen-2xl dark:bg-dark-background min-h-screen items-start",
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
      <ThemeSwitcher />
      <div className={style.container}>
        <Router>
          <Header />
          <div className={style.allRoutes}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaign/:id" element={<SingleCampaign />} />
              <Route path="/campaign/add" element={<AddCampaign />} />
              <Route path="/campaign/:id/stage/:stageId" element={<Stage />} />
              <Route path="/campaign/:id/stage/add" element={<AddStage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
