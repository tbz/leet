import { Language, languages } from "./i18n";
import * as Cookies from "js-cookie";

const DEFAULT_LANGUAGE = "en";
const COOKIE_NAME = "lang";

function isLanguage(testLanguage: string): testLanguage is Language {
  return testLanguage in languages;
}

function getSupportedLanguageFromCookie() {
  const testLanguage = Cookies.get(COOKIE_NAME);
  return testLanguage && isLanguage(testLanguage) ? testLanguage : null;
}

function getSupportedLanguageFromBrowser() {
  if (navigator.languages) {
    for (const locale in navigator.languages) {
      const testLanguage = locale.split("-")[0];
      if (isLanguage(testLanguage)) {
        return testLanguage;
      }
    }
  }
  return null;
}

export default function getFallbackLanguage() {
  return (
    getSupportedLanguageFromCookie() ||
    getSupportedLanguageFromBrowser() ||
    DEFAULT_LANGUAGE
  );
}
