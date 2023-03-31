import React, { useState } from "react";
import "./App.css";
import videoBg from "./assets/Galaxy.mp4";
import Facebook from "./assets/facebook.png";
import Twitter from "./assets/twitter.png";
import Email from "./assets/email.png";
import logo from "./assets/logo2.png";
import PlayBtn from "./assets/playicon.png";
import Modal from "react-modal";
import DaoSeeder from "./assets/daoseeder.mp4";
import Cross from "./assets/cross.png";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Popup"
      >
        <div className="daoseederVideo">
          <button onClick={closeModal} className="modalBtn">
            <img src={Cross} alt="cross" />
          </button>
          <video
            controls
            autoPlay
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          >
            <source src={DaoSeeder} type="video/mp4" />
          </video>
        </div>
      </Modal>
      <div className="overlay"></div>
      <video src={videoBg} autoPlay muted loop />
      <div className="content">
        <div className="brand">
          <img src={logo} width={100} />
          <h1>DaoSeeder</h1>
        </div>
        <p>A decentralized crowd-funding platform with trust</p>
        <img
          src={PlayBtn}
          alt="playbtn"
          className="playBtn"
          onClick={openModal}
        />
        <a
          className="btnForm"
          href="https://app.daoseeder.com"
          target={"_blank"}
          rel="noreferrer"
        >
          Launch App
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
