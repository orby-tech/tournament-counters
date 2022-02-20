import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { EnTranslations } from "./en";
import { RuTranslations } from "./ru";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: EnTranslations,
  ru: RuTranslations,
};

type LocMap = {
  [key: string]: LocMap | string;
};

const getLocWays = (way = "", dict: LocMap): LocMap => {
  const answerDict = {} as LocMap;
  for (const [key, value] of Object.entries(dict)) {
    answerDict[key] =
      typeof value === "string"
        ? `${way ? `${way}.` : ""}${key}`
        : getLocWays(`${way ? `${way}.` : ""}${key}`, value);
  }
  return answerDict;
};

const getLocWaysMap = (): typeof RuTranslations => {
  return getLocWays("", RuTranslations) as typeof RuTranslations;
};

export const locMap = getLocWaysMap()["translation"];

console.log(locMap);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
