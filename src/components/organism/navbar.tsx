import { useState, useEffect } from "react";
import { LanguageSelector } from "../atoms/language-selector";
import { useLanguage } from "../../hooks/useLanguage";
import { Matter } from "../atoms/text/matter";
import Menu from "../atoms/icons/menu";

export function Navbar({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { lang, t } = useLanguage();

  return (
    <nav
      className={`fixed w-full z-20 top-0 max-w-[1512px] transition-all duration-300 md:pt-10 ${
        scrolled ? "bg-white/10 backdrop-blur-sm md:py-6 rounded-b-xl" : "py-3"
      }`}
    >
      <div className="flex flex-col md:flex-wrap gap-4 md:gap-0 items-center mx-auto p-4 w-full justify-center">
        <div className="flex md:order-2 space-x-3 md:space-x-0 ltr:space-x">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 md:hidden focus:outline-none border-white border-2 rounded-full px-3 py-1 bg-white/10 backdrop-blur-sm"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <Menu />
          </button>
        </div>
        <LanguageSelector className="md:hidden"/>
        <div
          className={`items-start md:items-center w-full md:flex md:w-auto md:order-1 h-18 ${
            isOpen
              ? "flex max-md:min-h-[250px] max-md:max-w-[300px] max-md:border-2 max-md:border-white rounded-md max-md:bg-white/10 max-md:backdrop-blur-sm p-4"
              : "hidden max-h-0"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:p-0 font-medium md:space-x-8 ltr:space-x md:flex-row md:mt-0 md:border-0 items-center w-full justify-between gap-5 md:gap-0">
            {[
              { key: "home", label: t("navbar.home") },
              { key: "about", label: t("navbar.about") },
              { key: "tech-stack", label: t("navbar.techstack") },
              { key: "experience", label: t("navbar.experience") },
              { key: "projects", label: t("navbar.projects") },
            ].map((item) => (
              <li key={item.key}>
                <a
                  href={item.key === "home" ? "/" : undefined}
                  onClick={item.key !== "home" ? (e) => {
                    e.preventDefault();
                    const section = document.getElementById(item.key);
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  } : undefined}
                  className="language-selector__button text-white inline-flex items-center border-0 leading-8 gap-2 cursor-pointer 
                      relative after:absolute after:-bottom-3 after:left-0 after:h-[2px] 
                      after:w-0 after:bg-white after:transition-all after:duration-300 
                      hover:after:w-full"
                >
                  <Matter text={item.label} size="16|16" />
                </a>
              </li>
            ))}
          </ul>
          <LanguageSelector className="hidden md:flex ml-3 md:ml-8" />
        </div>

      </div>
    </nav>
  );
}
