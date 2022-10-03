import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { isSsr, NoSsr } from "./NoSsr";
import { Language, LanguageProvider, languages, useText } from "./i18n";
import { clearCookieValue, getCookieValue, setCookieValue } from "./cookie";
import getFallbackLanguage from "./getFallbackLanguage";
import usePageTracking from "./usePageTracking";
import useTimeUntil from "./useTimeUntil";
import useTitle from "./useTitle";

import "./App.css";

const timeUntilIsTime = (timeUntil: number, hour: number, minute: number) =>
  `${timeUntil}` === `${hour}${minute}`;

type MainProps = {
  timeUntil: number;
  hour: number;
  minute: number;
};

function Main({ timeUntil, hour, minute }: MainProps) {
  const answerClassNames = ["answer"];
  if (timeUntil === 0) {
    answerClassNames.push("now");
  }
  const timeUntilClassNames = ["time-until"];
  if (timeUntilIsTime(timeUntil, hour, minute)) {
    timeUntilClassNames.push("now");
  }

  const noText = useText("no");
  const yesText = useText("yes");
  const nextText = useText("minutes", { COUNT: timeUntil });

  return (
    <main>
      <NoSsr>
        <p className={answerClassNames.join(" ")}>
          {timeUntil > 0 ? noText : yesText}
        </p>
        {timeUntil > 0 ? (
          <p className={timeUntilClassNames.join(" ")}>{nextText}</p>
        ) : null}
      </NoSsr>
    </main>
  );
}

type HeaderProps = {
  timeUntil: number;
};
function Header({ timeUntil }: HeaderProps) {
  const headerText = useText("header");
  useTitle(timeUntil === 0 ? "🎉 " + headerText : headerText);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { pathname } = useLocation();
  useEffect(
    function resetFocus() {
      headerRef.current?.focus();
    },
    [pathname]
  );

  return (
    <header>
      <h1 ref={headerRef} tabIndex={-1}>
        {headerText}
      </h1>
    </header>
  );
}

function Copyright() {
  const contributionText = useText("contribution");

  return (
    <p className="copyright">
      © Tobias Baaz and contributors 2007-2021
      {contributionText ? (
        <>
          <br />
          Contributed by: {contributionText}
        </>
      ) : null}
    </p>
  );
}

type AppProps = {
  language?: Language;
  hour: number;
  minute: number;
};
function App({ hour, language, minute }: AppProps) {
  usePageTracking();
  let timeUntil = useTimeUntil(hour, minute);
  if (isSsr()) {
    timeUntil = 1;
  }

  const fallbackLanguage = getFallbackLanguage();
  const currentLanguage = language || fallbackLanguage;

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  });

  return (
    <LanguageProvider value={currentLanguage}>
      <div className="App">
        <Header timeUntil={timeUntil} />
        <Main timeUntil={timeUntil} hour={hour} minute={minute} />
        <footer lang="en">
          <NoSsr>
            {language && language !== fallbackLanguage ? (
              <Link
                className="cookie"
                to="/"
                onClick={() => setCookieValue(language)}
              >
                Set as your language
              </Link>
            ) : null}
          </NoSsr>
          <ul>
            {(Object.keys(languages) as Language[]).map((localeKey) => (
              <li
                className={
                  localeKey === currentLanguage ? "current" : undefined
                }
                key={localeKey}
                lang={localeKey}
              >
                {localeKey === currentLanguage ? (
                  languages[localeKey]
                ) : (
                  <Link
                    to={localeKey === fallbackLanguage ? "/" : `/${localeKey}`}
                  >
                    {languages[localeKey]}
                  </Link>
                )}
              </li>
            ))}
            <li className="contribute">
              <b>Contribute more languages!</b>{" "}
              <a href="mailto:tobias@baaz.nu?subject=isit1337.com%20contribution&amp;body=I%20want%20to%20contribute%21%0A%0ALanguage%3A%0ANative%20name%3A%0AContributor%3A%0A%0ATranslations%3A%0AIs%20it%2013%3A37%3F%20%3D%0AYes%20%3D%0ANo%20%3D%0ANext%20is%20in%20one%20minute%20%3D%0ANext%20is%20in%20%23%20minutes%20%3D%20%0A(Fill%20with%20more%20examples%20if%20your%20language%20has%20more%20number%20cases)%0A%0AHave%20a%20nice%20day%21">
                Send an email
              </a>{" "}
              or{" "}
              <a href="https://github.com/tbz/leet">send a request on Github</a>
            </li>
          </ul>
          <Copyright />
          <NoSsr>
            {getCookieValue() ? (
              <Link
                className="clear-cookie"
                to="/"
                onClick={() => clearCookieValue()}
              >
                Clear language setting
              </Link>
            ) : null}
          </NoSsr>
        </footer>
      </div>
    </LanguageProvider>
  );
}

export default App;
