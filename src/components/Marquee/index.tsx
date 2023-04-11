import React, { useEffect, useState } from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Marquee = () => {
  const style = {
    marquee:
      "flex items-center gap-2 text-dark-font-lightV1 bg-gradient-to-r from-light-primary-primary to-light-primary-secondary mb-4 -mt-6 p-2",
  };

  const [visibleDivIndex, setVisibleDivIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleDivIndex((visibleDivIndex + 1) % 2);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [visibleDivIndex]);

  return (
    <Link to="/faucet">
      <div className={style.marquee}>
        <TfiAnnouncement />
        <span style={{ display: visibleDivIndex === 0 ? "block" : "none" }}>
          This app is currently in testing. Thank you for your patience! Click
          for more info.
        </span>
        <span style={{ display: visibleDivIndex === 1 ? "block" : "none" }}>
          Please use DaoSeeder testnet to connect to the site for testing! Click
          for more info.
        </span>
      </div>
    </Link>
  );
};

export default Marquee;
