import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Language, LanguageProvider } from "./i18n";
import getFallbackLanguage from "./getFallbackLanguage";

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider
      value={getFallbackLanguage(
        window.location.search.substring(1) as Language
      )}
    >
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
