import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SingleCampaign from "./components/Campaigns/SingleCampaign";
import Header from "./components/Header";
import Home from "./components/Home";
import Stage from "./components/Stages";

function App() {
  const style = {
    wrapper: "w-full flex flex-row justify-center max-w-screen-2xl px-[200px]",
    container: "flex flex-col justify-center mt-6",
  };
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaign/:id" element={<SingleCampaign />} />
            <Route path="/campaign/:id/stage/:stageId" element={<Stage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
