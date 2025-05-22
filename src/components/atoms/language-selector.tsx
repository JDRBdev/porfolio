import React from 'react';
import { languages } from '../../i18n/ui';
import EnglishIcon from "./icons/english";
import SpanishIcon from "./icons/spain";
import FrenchIcon from "./icons/french";
import GermanIcon from "./icons/germany";
import { useLanguage } from '../../hooks/useLanguage';
import { Matter } from './text/matter';

const iconsMap = {
  en: EnglishIcon,
  es: SpanishIcon,
  fr: FrenchIcon,
  de: GermanIcon,
};

export function LanguageSelector({ className = "" }) {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`language-selector relative ${className}`}> {/* Añadido relative aquí */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-selector__button inline-flex items-center border-white border-2 rounded-md px-3 py-1 bg-white/10 backdrop-blur-sm leading-8 gap-2 cursor-pointer hover:bg-white/20 transition-colors duration-200"
      >
        <span className="language-selector__icon-container w-4 h-4 flex justify-center items-center mb-0.5">
          <i className="fa-solid fa-globe default-icon"></i>
          {iconsMap[lang as keyof typeof iconsMap] && (
            React.createElement(iconsMap[lang as keyof typeof iconsMap], { className: "rounded-xl w-4 h-4 absolute" })
          )}
        </span>
        <span className='py-1 min-w-18.25'>
          <Matter
            text={t("navbar.languages")}
            size="16|16"
            className="text-white text-start"
          />
        </span>
      </button>

      {isOpen && (
        <div className="language-selector__list-container absolute right-0 mt-2 z-10 border-2 border-white rounded-md bg-white/10 backdrop-blur-sm overflow-hidden min-w-full">
          <ul className="language-selector__list">
            {Object.entries(languages).map(([lang, label]) => {
              const IconComponent = iconsMap[lang as keyof typeof iconsMap];
              return (
                <li key={lang} className="hover:bg-white/20 transition-colors duration-200">
                  <a href={`/${lang}/`} className="flex items-center gap-2 px-3 py-2 text-white whitespace-nowrap">
                    {IconComponent && <IconComponent className="rounded-xl w-4 h-4" />}
                    <span className="min-w-18.25">
                      <Matter
                        text={label}
                        size='14|16'
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}