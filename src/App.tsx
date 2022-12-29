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
      <div className="overlay"></div>
      <video src={videoBg} autoPlay muted loop />
      <div className="content">
        <div className="brand">
          <img src={logo} width={100} />
          <h1>DaoSeeder</h1>
        </div>
        <p>
          Are you are crypto investor? Looking for cool crypto projects you can
          be a part of. Be confident in projects by their project details and
          their historical deliverables. You become part of the DAO to judge
          their successes and achievements. Be a part of the web3 revolution.
        </p>
        <a
          className="btnForm"
          href="https://form.typeform.com/to/GOOMPc2I"
          target={"_blank"}
          rel="noreferrer"
        >
          Get Notified At Launch
        </a>
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
