import React, { useEffect, useState } from "react";
import { languages, ui, defaultLang } from '../../i18n/ui';
import { useTranslations, type AvailableLang } from '../../i18n/utils';
import { LanguageSelector } from "../atoms/language-selector";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [currentLang, setCurrentLang] = useState<AvailableLang>(defaultLang);

  useEffect(() => {
    // Extraer el idioma de la URL cuando el componente se monta
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const urlLang = pathSegments[0] as AvailableLang;
    const detectedLang = languages[urlLang] ? urlLang : defaultLang;
    setCurrentLang(detectedLang);
  }, []);

  const t = useTranslations(currentLang);

  return (
    <nav className="fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 md:hidden focus:outline-none"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-center w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "flex" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 items-center">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded-sm md:hover:text-blue-700 md:p-0"
              >
                {t("navbar.home")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded-sm md:hover:text-blue-700 md:p-0"
              >
                {t("navbar.about")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded-sm md:hover:text-blue-700 md:p-0"
              >
                {t("navbar.techstack")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded-sm md:hover:text-blue-700 md:p-0"
              >
                {t("navbar.projects")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded-sm md:hover:text-blue-700 md:p-0"
              >
                {t("navbar.contact")}
              </a>
            </li>
            <LanguageSelector className="ml-3 md:m-0" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
