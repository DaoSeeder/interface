import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export const useFauctHandler = () => {
  const { address } = useAccount();
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const requestEth = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    setDisableBtn(true);
    try {
      const env = process.env.NODE_ENV; // = 'production' when deployed
      const urlToUse =
        env == "development"
          ? "http://localhost:3001/getETH"
          : "https://faucet.daoseeder.com/getETH";
      fetch(urlToUse, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      })
        .then(async (res) => {
          if (res.ok) {
            toast.success("Your transaction was successful");
            return "Success";
          } else {
            if (res.status === 409) {
              toast.error("You have already requested for ETH");
            } else if (res.status === 408) {
              toast.error(
                "Invalid user address. Please provide a valid user address"
              );
            } else {
              toast.error("An error occurred while processing your request");
            }
            throw new Error("An error occurred while processing your request");
          }
        })
        .catch((err) => {
          throw new Error(
            "An error occurred while processing your request\n" + err
          );
        });
    } catch (error) {
      toast.error("An error occurred while processing your request");
    }
    setDisableBtn(false);
  };

  return { requestEth, disableBtn };
};
