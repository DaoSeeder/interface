import React from "react";
import "./App.css";
import videoBg from "./assets/daoseeder.mp4";
import Facebook from "./assets/facebook.png";
import Twitter from "./assets/twitter.png";
import Email from "./assets/email.png";
import logo from "./assets/logo2.png";

function App() {
  return (
    <div className="App">
      <div className="overlay"></div>
      {/* <video src={videoBg} autoPlay muted loop /> */}
      <div className="content">
        <div className="brand">
          <img src={logo} width={60} />
          <h1>DaoSeeder</h1>
        </div>
        <p>A decentralized crowd-funding platform with trust</p>
        <div>
          <a
            className="btnForm"
            href="https://app.daoseeder.com"
            target={"_blank"}
            rel="noreferrer"
          >
            Launch App
          </a>
        </div>
        <video src={videoBg} autoPlay muted loop />
        <div className="icons">
          <img
            src={Facebook}
            onClick={() => {
              window.open(
                "https://www.facebook.com/profile.php?id=100088729073591"
              );
            }}
          />
          <hr className="line" />
          <img
            src={Twitter}
            onClick={() => {
              window.open("https://twitter.com/DaoSeederLabs");
            }}
          />
          <hr className="line" />
          <img
            src={Email}
            onClick={() => {
              window.location.href = "mailto:team@daoseeder.com";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
