import React from "react";
import { commonStyles } from "../../styles/commonStyles";

function Faq() {
  const style = {
    wrapper: "mt-8",
  };

  return (
    <div className={style.wrapper}>
      <div className={commonStyles.heading}>Frequently Asked Questions</div>
      <br></br>
      <div className={commonStyles.subHeading}>
        How does your platform make crypto funding trustable?
      </div>
      <div className={commonStyles.paragraph}>
        Campaign funds are held in an escrow by the platform until the DAO
        approves its release. The DAO judging can be based on real world events,
        real world data or achieved deliverables regarding the campaign.
        Otherwise the DAO has the option of refunding campaign funds.
      </div>
      <br></br>
      <div className={commonStyles.subHeading}>
        What do DaoSeeder campaign funders get in return for commiting funds to
        a DaoSeeder campaign?
      </div>
      <div className={commonStyles.paragraph}>
        DaoSeeder allows the campaign project to escrow their governance token
        given as a gift for funding.
      </div>
    </div>
  );
}

export default Faq;
