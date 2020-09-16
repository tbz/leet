import React, { useEffect, useState, useRef } from "react";
import "./App.css";

const TICK = 500;
const HOUR = 13;
const MINUTE = 37;

const locales = {
  da: "Dansk",
  de: "Deutsch",
  eo: "Esperanto",
  en: "English",
  es: "Español",
  et: "Eesti",
  fi: "Suomi",
  fr: "Français",
  hu: "Magyar",
  is: "Íslenska",
  nl: "Nederlands",
  no: "Norsk",
  pl: "Polski",
  sv: "Svenska",
  el: "Ελληνικά",
  ja: "日本語",
};

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

const timeUntilIsTime = (timeUntil: number) =>
  `${timeUntil}` === `${HOUR}${MINUTE}`;

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

function Main() {
  const timeUntil = getTimeUntil(useClock());
  const answerClassNames = ["answer"];
  if (timeUntil === 0) {
    answerClassNames.push("now");
  }
  const timeUntilClassNames = ["time-until"];
  if (timeUntilIsTime(timeUntil)) {
    timeUntilClassNames.push("now");
  }

  return (
    <main>
      <p className={answerClassNames.join(" ")}>
        {timeUntil > 0 ? "No" : "Yes"}
      </p>
      {timeUntil > 0 ? (
        <p className={timeUntilClassNames.join(" ")}>
          Next is in {timeUntil} minute(s)
        </p>
      ) : null}
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <header>
        <h1>Is it 1337?</h1>
      </header>
      <Main />
      <footer>
        <ul>
          {(Object.keys(locales) as Array<keyof typeof locales>).map(
            (localeKey) => (
              <li
                className={localeKey === "en" ? "current" : undefined}
                key={localeKey}
              >
                {localeKey === "en" ? (
                  locales[localeKey]
                ) : (
                  <a href="about:blank">{locales[localeKey]}</a>
                )}
              </li>
            )
          )}
        </ul>
        <p>
          <a href="about:blank">Contribute more languages!</a>
        </p>
        <p>© Tobias Baaz and contributors 2007-2020</p>
      </footer>
    </div>
  );
}

export default App;
