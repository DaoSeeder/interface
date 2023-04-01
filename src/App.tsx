import React, { useState, Fragment, useRef } from "react";
import "./App.css";
import videoBg from "./assets/Galaxy.mp4";
import Facebook from "./assets/facebook.png";
import Twitter from "./assets/twitter.png";
import Email from "./assets/email.png";
import logo from "./assets/logo2.png";
import PlayBtn from "./assets/playicon.png";
import DaoSeeder from "./assets/daoseeder.mp4";
import { Dialog, Transition } from "@headlessui/react";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayButtonClick = () => {
    if (!videoRef || !videoRef.current) return;
    setIsPlaying(true);
    videoRef.current.play();
  };

  return (
    <div className="App">
      {/* Modal */}
      <Transition appear show={modalIsOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className={"dialog"}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={"overlay"}></div>
          </Transition.Child>
          <div className={"dialogMain"}>
            <div className={"dialogDiv"}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={"dialogPanel"}>
                  <div className={"dialogBody"}>
                    <div className="video-container">
                      <video
                        onPlay={handlePlayButtonClick}
                        onPause={() => setIsPlaying(false)}
                        ref={videoRef}
                        controls
                        autoPlay={false}
                      >
                        <source src={DaoSeeder} type="video/mp4" />
                      </video>
                      {!isPlaying && (
                        <div
                          className="play-button"
                          onClick={handlePlayButtonClick}
                        >
                          <img
                            src={PlayBtn}
                            alt="playbtn"
                            className="playBtn"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* Modal */}
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
          Launch Test App
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
