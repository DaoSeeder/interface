import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { IReactHelmet } from "../../interfaces/IReactHelmet";

export default function HelmetMetaData(props: IReactHelmet) {
  const location = useLocation();
  const currentUrl = window.location.hostname + location.pathname;
  const title = props.title
    ? props.title
    : "Daoseeder: World's First Decentralized crowdfunding platform";
  const image = props.image
    ? props.image
    : "https://app.daoseeder.com/static/media/logo_final_new.5a3181911f1b38a009a7.png";
  const description = props.description
    ? props.description
    : "Would you like to fund cool web3 projects but don't know which ones are good? Need funding for your web3 project but don't know where to go? Join DaoSeeder.com: A decentralized crowdfunding platform with trust. DaoSeeder.com allows you to escrow funding to a project to be delivered only if the project is a success.";
  const hashtag = "#daoseeder";
  return (
    <Helmet>
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta property="title" content={title} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="DaoSeeder" />
      <meta property="og:description" content={description} />{" "}
    </Helmet>
  );
}
