import { createContext, useContext } from "react";
import IntlMessageFormat from "intl-messageformat";

export const languages = {
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
  it: "Italiano",
  lv: "Latviešu",
  nl: "Nederlands",
  no: "Norsk",
  pl: "Polski",
  sv: "Svenska",
  ber: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
  el: "Ελληνικά",
  ja: "日本語",
};

export type Language = keyof typeof languages;

export type Messages = {
  __name: string;
  header: string;
  yes: string;
  no: string;
  minutes: string;
  contribution?: string;
};

type MessagesDictionary = Record<Language, Messages>;

const messages: MessagesDictionary = require("./messages.json");

const LanguageContext = createContext<Language>("en");
export const LanguageProvider = LanguageContext.Provider;

export function useCurrentLanguage() {
  return useContext(LanguageContext);
}

function useTexts() {
  const language = useContext(LanguageContext);
  if (!language) {
    throw new Error("No language provided");
  }
  if (!(language in messages)) {
    throw new Error(`Unsupported language provided: "${language as string}"`);
  }
  return messages[language];
}

const cache: Partial<
  Record<Language, Partial<Record<keyof Messages, IntlMessageFormat>>>
> = {};

export function useText(key: keyof Messages, input?: any) {
  const language = useCurrentLanguage();
  const texts = useTexts();
  const text = texts[key];

  if (text) {
    if (!input) {
      // No need to go to messageformat
      return text;
    }

    if (!(language in cache)) cache[language] = {};
    if (!(key in cache[language]!))
      cache[language]![key] = new IntlMessageFormat(text, language);

    return cache[language]![key]!.format(input) as string;
  }

  return "";
}
