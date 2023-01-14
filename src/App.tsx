import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const style = {
    wrapper: "w-full flex flex-row justify-center",
    container: "w-9/12 flex flex-col justify-center mt-6",
  };
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
