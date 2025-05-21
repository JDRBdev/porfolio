// src/hooks/useLanguage.ts
import { useEffect, useState } from "react";
import { defaultLang, languages } from "../i18n/ui";
import type { AvailableLang } from "../i18n/utils";
import { useTranslations } from "../i18n/utils";

export const useLanguage = () => {
  const [lang, setLang] = useState<AvailableLang>(defaultLang);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const urlLang = pathSegments[0] as AvailableLang;
    const detectedLang = languages[urlLang] ? urlLang : defaultLang;
    setLang(detectedLang);
  }, []);

  const t = useTranslations(lang);

  return { lang, t };
};