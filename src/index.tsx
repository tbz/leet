import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Language, languages } from "./i18n";
import NotFound from "./NotFound";
import Clock from "./Clock";

const props = {
  hour: 13,
  minute: 37,
};

function Site() {
  return (
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
                language={location.pathname.substr(1).split("/")[0] as Language}
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
    </React.StrictMode>
  );
}

const rootElement = document.getElementById("root");
if (rootElement?.hasChildNodes()) {
  hydrate(<Site />, rootElement);
} else {
  render(<Site />, rootElement);
}
