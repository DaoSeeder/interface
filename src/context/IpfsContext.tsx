import { IPFSHTTPClient } from "ipfs-http-client";
import React from "react";

const IpfsContext = React.createContext<IPFSHTTPClient | null>(null);

export default IpfsContext;
