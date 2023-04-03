import React from "react";
import { useFauctHandler } from "../../hooks/useFaucetHandler";

function Faucet() {
  const { disableBtn, requestEth } = useFauctHandler();
  const style = {
    faucet: "mt-8 flex justify-center w-full",
    faucetBox:
      "w-[60%] bg-white dark:bg-dark-box bg-light-font-lightV2 rounded-2xl p-6 flex flex-col text-light-font-lightV1 dark:text-dark-font-lightV1",
    faucetHeading: "text-2xl font-bold",
    faucetHeading2: "font-light text-xs mt-2",
    faucetBtn:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 mt-4 rounded-full bg-gradient-to-r from-light-primary-primary to-light-primary-secondary px-3 py-2",
    disableButton: "pointer-events-none",
  };
  return (
    <div className={style.faucet}>
      <div className={style.faucetBox}>
        <div>
          <div className={style.faucetHeading}>Get Testnet ETH</div>
          <div className={style.faucetHeading2}>
            Request ETH to your ETH wallet address. Each address will be given 1
            ETH in their wallet. You can request funds again after 1 hour.
          </div>
        </div>
        <div>
          <button
            className={`${style.faucetBtn} ${
              disableBtn ? style.disableButton : ""
            }`}
            onClick={() => {
              requestEth();
            }}
          >
            Request Funds
          </button>
        </div>
      </div>
    </div>
  );
}

export default Faucet;
