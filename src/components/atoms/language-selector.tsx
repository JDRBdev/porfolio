import React from 'react';
import { languages, ui, defaultLang } from '../../i18n/ui';
import { useTranslations, type AvailableLang } from '../../i18n/utils';
import EnglishIcon from "./icons/english";
import SpanishIcon from "./icons/spain";
import FrenchIcon from "./icons/french";
import GermanIcon from "./icons/germany";
import { useEffect, useState } from 'react';

const iconsMap = {
  en: EnglishIcon,
  es: SpanishIcon,
  fr: FrenchIcon,
  de: GermanIcon,
  // add more languages & icons here if needed
};

export function LanguageSelector({ className = "" }) {
  const [currentLang, setCurrentLang] = useState<AvailableLang>(defaultLang);

  useEffect(() => {
    // Extraer el idioma de la URL cuando el componente se monta
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const urlLang = pathSegments[0] as AvailableLang;
    const detectedLang = languages[urlLang] ? urlLang : defaultLang;
    setCurrentLang(detectedLang);
  }, []);

  const t = useTranslations(currentLang);
  const languageLabel = t("navbar.languages");

  return (
    <div className={`language-selector content-center ${className}`}>
      <input type="radio" name="language" id="default" defaultChecked className="hidden" />
      <input type="checkbox" id="language-checkbox" className="hidden" />

      <label
        htmlFor="language-checkbox"
        className="language-selector__button inline-flex items-center border border-white rounded-md px-3 py-1 bg-white/10 backdrop-blur-sm leading-8 gap-2 cursor-pointer hover:bg-white/20 transition-colors duration-200"
      >
        <span className="language-selector__icon-container w-4 h-4 flex justify-center items-center transition-transform transform-gpu group-hover:translate-x-3 duration-500 mb-0.5">
          <i className="fa-solid fa-globe default-icon"></i>
          {iconsMap[currentLang] && (
            React.createElement(iconsMap[currentLang], { className: "rounded-xl w-4 h-4 absolute" })
          )}
        </span>
        <span className='min-w-18.25 text-white'>{languageLabel}</span>
      </label>

      <div className="language-selector__list-container absolute left-0 mt-2 z-10 hidden border border-white rounded-md bg-white/10 backdrop-blur-sm overflow-hidden">
        <ul className="language-selector__list">
          {Object.entries(languages).map(([lang, label]) => {
            const IconComponent = iconsMap[lang as keyof typeof iconsMap];
            return (
              <li key={lang} className="hover:bg-white/20 transition-colors duration-200">
                <a href={`/${lang}/`} className="flex items-center gap-2 px-3 py-2 text-white">
                  {IconComponent && <IconComponent className="rounded-xl w-4 h-4" />}
                  <span className="min-w-18.25">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}