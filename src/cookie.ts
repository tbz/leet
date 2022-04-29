// @ts-expect-error No typings
import Cookies from "js-cookie";
import { Language } from "./i18n";

const COOKIE_NAME = "lang";

export function getCookieValue() {
  return Cookies.get(COOKIE_NAME);
}

export function setCookieValue(language: Language) {
  Cookies.set(COOKIE_NAME, language);
}

export function clearCookieValue() {
  Cookies.remove(COOKIE_NAME);
}
