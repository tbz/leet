import React from "react";
import { Link } from "react-router-dom";
import usePageTracking from "./usePageTracking";
import useTitle from "./useTitle";

import "./NotFound.css";

function NotFound() {
  const headerText = "Is it 13:37?";
  const mainText = "Language not found";
  useTitle(`${headerText} – ${mainText}`);
  usePageTracking();

  return (
    <div className="NotFound">
      <header>
        <h1>{headerText}</h1>
      </header>
      <main>
        <p>I don't know :(</p>
      </main>
      <footer>
        <p>
          <Link to="/">Go back!</Link>
        </p>
      </footer>
    </div>
  );
}

export default NotFound;
