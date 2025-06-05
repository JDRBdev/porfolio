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

    let detectedLang: AvailableLang;

    if (storedLang && languages[storedLang]) {
      detectedLang = storedLang;
      if (urlLang !== storedLang) {
      window.location.href = `/${storedLang}/`;
      return;
      }
    } else if (languages[urlLang]) {
      detectedLang = urlLang;
    } else {
      detectedLang = defaultLang;
      window.location.href = `/${defaultLang}/`;
      return;
    }

    setLang(detectedLang);
    localStorage.setItem("preferredLanguage", detectedLang);
  }, []);

  const setLangManual = (newLang: AvailableLang) => {
    if (languages[newLang]) {
      setLang(newLang);
      localStorage.setItem("preferredLanguage", newLang);
      // Get current path without the language segment
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      // Remove the first segment (current language)
      const restPath = pathSegments.slice(1).join("/");
      // Build new URL
      const newUrl = `/${newLang}${restPath ? "/" + restPath : "/"}`;
      window.location.href = newUrl;
    }
  };

  const t = useTranslations(lang);

  return { lang, t, setLang: setLangManual };
};
