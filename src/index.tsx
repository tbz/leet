import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { Language, languages } from "./i18n";
import NotFound from "./NotFound";
import Clock from "./Clock";

const props = {
  hour: 13,
  minute: 37,
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App {...props} />
        </Route>
        <Route
          sensitive
          exact
          path={Object.keys(languages).map((locale) => `/${locale}`)}
          render={({ location }) => (
            <App
              {...props}
              language={location.pathname.substr(1) as Language}
            />
          )}
        />
        <Route sensitive exact path="/clock">
          <Clock {...props} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
