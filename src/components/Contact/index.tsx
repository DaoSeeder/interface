import React from "react";
import { commonStyles } from "../../styles/commonStyles";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";

const Contact = () => {
  const style = {
    wrapper: "mt-8",
    icons: "",
    icon: "mt-4",
  };

  return (
    <div className={style.wrapper}>
      <div className={commonStyles.heading}>DaoSeederLabs</div>
      <br></br>
      <div className={style.icons}>
        <a
          target="_blank"
          href="https://twitter.com/DaoSeederLabs"
          rel="noreferrer"
        >
          <div className={style.icon + " " + commonStyles.subHeading}>
            <FaTwitterSquare size={28} color="green" />
            @DaoSeederLabs
          </div>
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com/daoseeder"
          rel="noreferrer"
        >
          <div className={style.icon + " " + commonStyles.subHeading}>
            <BsFacebook size={28} color="green" />
            DaoSeeder
          </div>
        </a>
        <a target="_blank" href="mailto:team@daoseeder.com" rel="noreferrer">
          <div className={style.icon + " " + commonStyles.subHeading}>
            <AiTwotoneMail size={28} color="green" />
            team@daoseeder.com
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
