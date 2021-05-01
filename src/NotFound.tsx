import React from "react";
import { Link } from "react-router-dom";
import usePageTracking from "./usePageTracking";
import useTitle from "./useTitle";

import "./NotFound.css";

function NotFound() {
  const headerText = "Is it 1337?";
  const mainText = "Language not found";
  useTitle(`${headerText} – ${mainText}`);
  usePageTracking();

  return (
    <div className="NotFound">
      <div className="header">
        <h1>{headerText}</h1>
      </div>
      <div className="main">
        <p>I don't know :(</p>
      </div>
      <div className="footer">
        <p>
          <Link to="/">Go back!</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
