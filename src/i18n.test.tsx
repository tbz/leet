import { languages } from "./i18n";

function isLatin(s: string) {
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) < 127) {
      return true;
    }
  }
}

test("languages are sorted by code and script", () => {
  const sortedCodes = Object.keys(languages) as Array<keyof typeof languages>;
  sortedCodes.sort((a, b) => {
    const aIsLatin = isLatin(languages[a]);
    const bIsLatin = isLatin(languages[b]);

    if (aIsLatin && !bIsLatin) {
      return -1;
    }
    if (!aIsLatin && bIsLatin) {
      return 1;
    }

    return +b - +a;
  });

  Object.keys(languages).forEach(function (code, index) {
    expect(code).toEqual(sortedCodes[index]);
  });
});
