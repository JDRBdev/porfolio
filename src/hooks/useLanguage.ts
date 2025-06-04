import { useEffect, useState } from "react";
import { defaultLang, languages } from "../i18n/ui";
import type { AvailableLang } from "../i18n/utils";
import { useTranslations } from "../i18n/utils";

export const useLanguage = () => {
  const [lang, setLang] = useState<AvailableLang>(defaultLang);

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage") as AvailableLang | null;

    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const urlLang = pathSegments[0] as AvailableLang;

    const detectedLang =
      storedLang && languages[storedLang]
        ? storedLang
        : languages[urlLang]
        ? urlLang
        : defaultLang;

    setLang(detectedLang);
    localStorage.setItem("preferredLanguage", detectedLang);
  }, []);

  const setLangManual = (newLang: AvailableLang) => {
    if (languages[newLang]) {
      setLang(newLang);
      localStorage.setItem("preferredLanguage", newLang);
      window.location.href = `/${newLang}/`;
    }
  };

  const t = useTranslations(lang);

  return { lang, t, setLang: setLangManual };
};
