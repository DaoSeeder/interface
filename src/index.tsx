import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { hardhat } from "wagmi/chains";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const {
  chains,
  provider: wagmiProvider,
  webSocketProvider,
} = configureChains([hardhat], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider: wagmiProvider,
  webSocketProvider,
});

root.render(
  <WagmiConfig client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WagmiConfig>
);

reportWebVitals();
