import React, { useState } from "react";
import { create } from "ipfs-http-client";

const IpfsUpload = () => {
  const [cid, setCid] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const dataFunc = async () => {
    const auth =
      "Basic " +
      window.btoa(
        process.env.REACT_APP_INFURA_PROJECT_ID +
          ":" +
          process.env.REACT_APP_INFURA_API_SECRET
      );
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    if (client) {
      const file = await client.add(inputVal);
      setCid([...cid, file.path]);
    }
  };
  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setInputVal(e.target.value);
    }
  };
  return (
    <>
      <input
        type="text"
        className={"border border-sky-500 mt-2"}
        onChange={getData}
        placeholder={"Enter data"}
      />
      <button onClick={dataFunc} className={"border border-sky-500 mt-2"}>
        IpfsUpload
      </button>
      {cid.map((res, idx) => (
        <p className={"mt-2"} key={idx}>
          {res}
        </p>
      ))}
    </>
  );
};

export default IpfsUpload;
