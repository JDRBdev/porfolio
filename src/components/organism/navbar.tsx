import { useState } from "react";
import { LanguageSelector } from "../atoms/language-selector";
import { useLanguage } from "../../hooks/useLanguage";
import { Matter } from "../atoms/text/matter";
import { Caslon } from "../atoms/text/caslon";
import Menu from "../atoms/icons/menu";

export function Navbar({className = ""}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { lang, t } = useLanguage();

  return (
    <nav className="fixed w-full z-20 top-6 max-w-[1512px]">
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
          className={`items-start md:items-center w-full md:flex md:w-auto md:order-1 h-18 ${
            isOpen ? "flex max-md:min-h-[550px] mt-4 max-md:border-2 max-md:border-white rounded-md max-md:bg-white/10 max-md:backdrop-blur-sm p-4" : "hidden max-h-0"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:p-0 font-medium md:space-x-8 ltr:space-x md:flex-row md:mt-0 md:border-0 items-center w-full justify-between gap-5 md:gap-0">
                {[
                  { key: "home", label: t("navbar.home") },
                  { key: "about", label: t("navbar.about") },
                  { key: "techstack", label: t("navbar.techstack") },
                  { key: "projects", label: t("navbar.projects") },
                  { key: "contact", label: t("navbar.contact") },
                ].map(item => (
                  <li key={item.key}>
                    <a
                      href={`#${item.key}`}
                      className="language-selector__button text-white inline-flex items-center border-0 leading-8 gap-2 cursor-pointer 
                      relative after:absolute after:-bottom-3 after:left-0 after:h-[2px] 
                      after:w-0 after:bg-white after:transition-all after:duration-300 
                      hover:after:w-full"
                    >
                      <Matter
                        text={item.label}
                        size="16|16"
                      />
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
