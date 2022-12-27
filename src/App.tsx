import React from "react";
import "./App.css";
import videoBg from "./assets/Galaxy2.mp4";
import Facebook from "./assets/facebook.png";
import Instagram from "./assets/instagram.png";
import Twitter from "./assets/twitter.png";
import Telegram from "./assets/telegram.png";

function App() {
  return (
    <div className="App">
      <video src={videoBg} autoPlay muted loop />
      <div className="content">
        <h1>DaoSeeder</h1>
        <p>A decentalized crowdfunding platform</p>
        <button>Get notified at launch</button>
        <div className="icons">
          <img src={Facebook} />
          <img src={Instagram} />
          <img src={Twitter} />
          <img src={Telegram} />
        </div>
      </div>
    </div>
  );
}

export default App;
