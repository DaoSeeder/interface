import React from "react";
import { useFauctHandler } from "../../hooks/useFaucetHandler";
import { AiOutlineLoading } from "react-icons/ai";

function Faucet() {
  const { disableBtn, requestEth } = useFauctHandler();
  const style = {
    faucet: "mt-8 flex justify-center w-full",
    faucetBox:
      "w-[60%] bg-white dark:bg-dark-box bg-light-font-lightV2 rounded-2xl p-6 flex flex-col text-light-font-lightV1 dark:text-dark-font-lightV1",
    faucetHeading: "text-2xl font-bold",
    faucetText: "font-light text-xs mt-2",
    faucetBtn:
      "text-light-font-lightV1 dark:text-dark-font-lightV1 mt-4 rounded-full px-3 py-2",
    disableButton: "pointer-events-none bg-disabled",
    enableBtn:
      "bg-gradient-to-r from-light-primary-primary to-light-primary-secondary",
  };
  return (
    <div className={style.faucet}>
      <div className={style.faucetBox}>
        <div>
          <div className={style.faucetHeading}>Get Testnet ETH</div>
          <div className={style.faucetText}>
            RPC URL: https://rpctest.daoseeder.com
          </div>
          <div className={style.faucetText}>Chain ID: 326</div>
          <div className={style.faucetText}>
            Request ETH to your ETH wallet address. Each address will be given 1
            ETH in their wallet. You can request funds again after 1 hour.
          </div>
        </div>
        <div>
          <button
            className={`${style.faucetBtn} ${
              disableBtn ? style.disableButton : style.enableBtn
            }`}
            onClick={() => {
              requestEth();
            }}
          >
            {disableBtn ? (
              <AiOutlineLoading className="animate-spin w-12 h-6" />
            ) : (
              <p>Request Funds</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Faucet;
