import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

root.render(
  <WagmiConfig client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WagmiConfig>
);

reportWebVitals();
