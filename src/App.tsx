import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Language, languages, useCurrentLanguage, useText } from "./i18n";
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

type MainProps = { timeUntil: number };
function Main({ timeUntil }: MainProps) {
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

function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function App() {
  const language = useCurrentLanguage();
  const headerText = useText("header");
  const contributionText = useText("contribution");
  const timeUntil = getTimeUntil(useClock());

  useTitle(timeUntil === 0 ? "🎉 " + headerText : headerText);

  return (
    <div className="App">
      <header>
        <h1>{headerText}</h1>
      </header>
      <Main timeUntil={timeUntil} />
      <footer>
        <ul>
          {(Object.keys(languages) as Language[]).map((localeKey) => (
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
          <li className="contribute">
            <a href="mailto:tobias@baaz.nu?subject=isit1337.com%20contribution&amp;body=I%20want%20to%20contribute%21%0A%0ALanguage%3A%0A%0ATranslations%3A%0AIs%20it%201337%3F%20%3D%0AYes%20%3D%0ANo%20%3D%0ANext%20is%20in%20%23%20minute%28s%29%20%3D%0A%0AHave%20a%20nice%20day%21">
              Contribute more languages!
            </a>
          </li>
        </ul>
        <p className="copyright">
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
