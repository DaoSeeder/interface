import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WagmiConfig, createClient, configureChains, Chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { hardhat } from "wagmi/chains";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const DaoSeederTest: Chain = {
  id: 326,
  name: "DaoSeeder",
  network: "DaoSeeder Test",
  nativeCurrency: {
    name: process.env.REACT_APP_NETWORK_CURRECNY || "ETH",
    symbol: process.env.REACT_APP_NETWORK_CURRECNY || "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://rpctest.daoseeder.com/"] },
    default: { http: ["https://rpctest.daoseeder.com/"] },
  },
  testnet: true,
};

const env = process.env.NODE_ENV; // = 'production' when deployed
const chainToUse = env == "development" ? hardhat : DaoSeederTest;
const {
  chains,
  provider: wagmiProvider,
  webSocketProvider,
} = configureChains([chainToUse], [publicProvider()]);

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
