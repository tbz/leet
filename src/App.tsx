import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Language, languages, useCurrentLanguage, useText } from "./i18n";

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

function App() {
  const language = useCurrentLanguage();
  const headerText = useText("header");
  const contributionText = useText("contribution");
  return (
    <div className="App">
      <header>
        <h1>{headerText}</h1>
      </header>
      <Main />
      <footer>
        <ul>
          {(Object.keys(languages) as Array<Language>).map((localeKey) => (
            <li
              className={localeKey === language ? "current" : undefined}
              key={localeKey}
            >
              {localeKey === language ? (
                languages[localeKey]
              ) : (
                <Link to={`/${localeKey}`}>{languages[localeKey]}</Link>
              )}
            </li>
          ))}
        </ul>
        {/* <p>
          <a href="about:blank">Contribute more languages!</a>
        </p> */}
        <p>
          © Tobias Baaz and contributors 2007-2020
          {contributionText ? (
            <>
              <br />
              Contributed by: {contributionText}
            </>
          ) : null}
        </p>
      </footer>
    </div>
  );
}

export default App;
