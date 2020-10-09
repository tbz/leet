import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Language, LanguageProvider, languages, useText } from "./i18n";
import { clearCookieValue, getCookieValue, setCookieValue } from "./cookie";
import getFallbackLanguage from "./getFallbackLanguage";
import usePageTracking from "./usePageTracking";

import "./App.css";

const TICK = 500;
const HOUR = 13;
const MINUTE = 37;

function getTimeUntil(
  now: Date,
  hours: number = HOUR,
  minutes: number = MINUTE
) {
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  if (currentHours === hours && currentMinutes === minutes) {
    return 0;
  }

  let next = new Date(now);
  next.setSeconds(0);
  next.setMinutes(minutes);
  next.setHours(hours);

  if (currentHours > hours || currentMinutes > minutes) {
    next.setDate(next.getDate() + 1);
  }

  return Math.ceil((next.getTime() - now.getTime()) / 60 / 1000);
}

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
      <p className={answerClassNames.join(" ")}>
        {timeUntil > 0 ? noText : yesText}
      </p>
      {timeUntil > 0 ? (
        <p className={timeUntilClassNames.join(" ")}>{nextText}</p>
      ) : null}
    </main>
  );
}

function useClock(tick = TICK) {
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setNow(new Date());
    }, tick);
    return () => {
      clearInterval(intervalRef.current!);
    };
  });
  return now;
}

function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

type HeaderProps = {
  timeUntil: number;
};
function Header({ timeUntil }: HeaderProps) {
  const headerText = useText("header");
  useTitle(timeUntil === 0 ? "🎉 " + headerText : headerText);

  return (
    <header>
      <h1>{headerText}</h1>
    </header>
  );
}

function Copyright() {
  const contributionText = useText("contribution");

  return (
    <p className="copyright">
      © Tobias Baaz and contributors 2007-2020
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
};
function App({ language }: AppProps) {
  usePageTracking();

  const fallbackLanguage = getFallbackLanguage();
  const currentLanguage = language || fallbackLanguage;
  const timeUntil = getTimeUntil(useClock());

  return (
    <LanguageProvider value={currentLanguage}>
      <div className="App">
        <Header timeUntil={timeUntil} />
        <Main timeUntil={timeUntil} hour={HOUR} minute={MINUTE} />
        <footer>
          {language && language !== fallbackLanguage ? (
            <Link
              className="cookie"
              to="/"
              onClick={() => setCookieValue(language)}
            >
              Set as your language
            </Link>
          ) : null}
          <ul>
            {(Object.keys(languages) as Language[]).map((localeKey) => (
              <li
                className={
                  localeKey === currentLanguage ? "current" : undefined
                }
                key={localeKey}
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
              <a href="mailto:tobias@baaz.nu?subject=isit1337.com%20contribution&amp;body=I%20want%20to%20contribute%21%0A%0ALanguage%3A%0ANative%20name%3A%0AContributor%3A%0A%0ATranslations%3A%0AIs%20it%201337%3F%20%3D%0AYes%20%3D%0ANo%20%3D%0ANext%20is%20in%20one%20minute%20%3D%0ANext%20is%20in%20%23%20minutes%20%3D%20%0A(Fill%20with%20more%20examples%20if%20your%20language%20has%20more%20number%20cases)%0A%0AHave%20a%20nice%20day%21">
                Contribute more languages!
              </a>
            </li>
          </ul>
          <Copyright />
          {getCookieValue() ? (
            <Link
              className="clear-cookie"
              to="/"
              onClick={() => clearCookieValue()}
            >
              Clear language setting
            </Link>
          ) : null}
        </footer>
      </div>
    </LanguageProvider>
  );
}

export default App;
