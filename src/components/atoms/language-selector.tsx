import React from "react";
import { languages } from "../../i18n/ui";
import { useLanguage } from "../../hooks/useLanguage";
import { Matter } from "./text/matter";

export function LanguageSelector({ className = "" }) {
  const { lang, t, setLang } = useLanguage();

  return (
    <div className={`flex border-2 border-white rounded-xl select-none text-white ${className}`}>
      {Object.entries(languages).map(([languageCode, label], index) => {
        const roundedClass =
          index === 0
            ? "rounded-l-lg"
            : index === Object.entries(languages).length - 1
            ? "rounded-r-lg"
            : "";

        return (
          <label
            key={languageCode}
            className="radio flex flex-grow items-center justify-center rounded-lg cursor-pointer"
          >
            <input
              type="radio"
              name="radio"
              value={languageCode}
              className="peer hidden"
              checked={lang === languageCode}
              onChange={() => setLang(languageCode as "en" | "es" | "fr" | "de")}
            />
            <span
              className={`tracking-widest bg-white/10 text-white peer-checked:bg-black/10 p-3 ${roundedClass}`}
            >
              <Matter
                text={label}
                size="14|16"
                className="text-white"
              />
            </span>
          </label>
        );
      })}
    </div>
  );
}
