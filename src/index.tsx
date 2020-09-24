import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Language, LanguageProvider, languages } from "./i18n";
import getFallbackLanguage from "./getFallbackLanguage";

function Wrapper() {
  const language = useLocation().pathname.substr(1);
  return (
    <LanguageProvider value={(language as Language) || getFallbackLanguage()}>
      <App />
    </LanguageProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Wrapper />
        </Route>
        <Route
          sensitive
          exact
          path={Object.keys(languages).map((locale) => `/${locale}`)}
        >
          <Wrapper />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
