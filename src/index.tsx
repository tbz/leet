import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<App {...props} />} />
          {Object.keys(languages).map((locale) => (
            <Route
              key={locale}
              caseSensitive
              path={"/" + locale}
              element={<App {...props} language={locale as Language} />}
            />
          ))}
          <Route caseSensitive path="/clock" element={<Clock {...props} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

const container = document.getElementById("root");
if (container?.hasChildNodes()) {
  hydrateRoot(container, <Site />);
} else if (container) {
  const root = createRoot(container);
  root.render(<Site />);
}
