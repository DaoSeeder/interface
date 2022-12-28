import React from "react";
import "./App.css";
import videoBg from "./assets/Galaxy.mp4";
import Facebook from "./assets/facebook.png";
// import Instagram from "./assets/instagram.png";
import Twitter from "./assets/twitter.png";
// import Telegram from "./assets/telegram.png";
import logo from "./assets/logo2.png";

function App() {
  return (
    <div className="App">
      <video src={videoBg} autoPlay muted loop />
      <div className="content">
        <div className="brand">
          <img src={logo} width={100} />
          <h1>DaoSeeder</h1>
        </div>
        <p>A decentralized crowd-funding platform with trust</p>
        <button
          onClick={() => {
            window.open("https://form.typeform.com/to/GOOMPc2I");
          }}
        >
          Get notified at launch
        </button>
        <div className="icons">
          <img
            src={Facebook}
            onClick={() => {
              window.open(
                "https://www.facebook.com/profile.php?id=100088729073591"
              );
            }}
          />
          {/* <img src={Instagram} /> */}
          <img
            src={Twitter}
            onClick={() => {
              window.open("https://twitter.com/DaoSeederLabs");
            }}
          />
          {/* <img src={Telegram} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
