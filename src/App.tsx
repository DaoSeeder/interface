import React from "react";
import "./App.css";
import videoBg from "./assets/Galaxy.mp4";
import Facebook from "./assets/facebook.png";
import Twitter from "./assets/twitter.png";
import Email from "./assets/email.png";
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
        <p>A Decentralized Crowd-Funding Platform With Trust</p>
        <button
          onClick={() => {
            window.open("https://form.typeform.com/to/GOOMPc2I");
          }}
        >
          Get Notified At Launch
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
          <img
            src={Twitter}
            onClick={() => {
              window.open("https://twitter.com/DaoSeederLabs");
            }}
          />
          <a href="mailto:team@daoseeder.com">
            <img src={Email} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
