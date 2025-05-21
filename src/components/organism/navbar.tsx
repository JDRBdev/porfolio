import React, { useEffect, useState } from "react";
import { languages, ui, defaultLang } from '../../i18n/ui';
import { useTranslations, type AvailableLang } from '../../i18n/utils';
import { LanguageSelector } from "../atoms/language-selector";
import Menu from "../atoms/icons/menu";

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
    <nav className="fixed w-full z-20 top-0">
      <div className="flex flex-wrap items-center mx-auto p-4 w-full justify-center">
        <div className="flex md:order-2 space-x-3 md:space-x-0 ltr:space-x">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 md:hidden focus:outline-none"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <Menu />
          </button>
        </div>
        <div
          className={`items-center justify-center w-full md:flex md:w-auto md:order-1 ${isOpen ? "flex" : "hidden"
            }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:p-0 mt-4 font-medium md:space-x-8 ltr:space-x md:flex-row md:mt-0 md:border-0 items-center w-full justify-between gap-5 md:gap-0">
            {[
              { key: "home", label: t("navbar.home") },
              { key: "about", label: t("navbar.about") },
              { key: "techstack", label: t("navbar.techstack") },
              { key: "projects", label: t("navbar.projects") },
              { key: "contact", label: t("navbar.contact") },
            ].map(item => (
              <li key={item.key}>
                <a
                  href="#"
                  className="py-2 px-3 text-white rounded-sm md:p-0 w-full 
                  relative after:absolute after:bottom-0 after:left-0 after:h-[2px] 
                  after:w-0 after:bg-white after:transition-all after:duration-300 
                  hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <LanguageSelector className="ml-3 md:m-0" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
