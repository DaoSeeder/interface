import React from "react";
import { commonStyles } from "../../styles/commonStyles";

const LearnMore = () => {
  const style = {
    wrapper: "mt-8",
  };

  return (
    <div className={style.wrapper}>
      <div className={commonStyles.heading}>Learn More</div>
      <br></br>
      <div className={commonStyles.subHeading}>The Impact</div>
      <div className={commonStyles.paragraph}>
        Funding for crypto projects is currently a difficult process. This is
        due to the high cost of marketing as well as general distrust in crypto
        projects. Our platform aims to deliver trust in crypto investments by
        creating a DAO with seed funds in escrow. The DAO will determine whether
        a project has met their deliverables and if it is a trustworthy project.
        If at any stage the DAO deems a project as failing their requirements,
        escrowed funds get refunded. However, if the DAO deems a project as
        passing, funds get delivered to the project for their next stage of
        development.
      </div>
      <br></br>
      <div className={commonStyles.subHeading}>Ways You Can Help</div>
      <div className={commonStyles.paragraph}>
        We are open to add marketers and testers to our team. You can also help
        by sharing our project with others.
      </div>
    </div>
  );
};

export default LearnMore;
