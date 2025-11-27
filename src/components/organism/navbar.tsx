import { useState, useEffect } from "react";
import { LanguageSelector } from "../atoms/language-selector";
import { useLanguage } from "../../hooks/useLanguage";
import { Poppins } from "../atoms/text/poppins";
import Code from "../atoms/icons/code";

// Componente Navbar que muestra la barra de navegación principal
export function Navbar({ className = "" }) {
  // Estado para controlar si el menú móvil está abierto
  const [isOpen, setIsOpen] = useState(false);
  // Estado para saber si la página ha sido desplazada (scroll)
  const [scrolled, setScrolled] = useState(false);

  // Efecto para cambiar el estado 'scrolled' al hacer scroll
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

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Hook personalizado para el idioma y las traducciones
  const { lang, t } = useLanguage();

  return (
    <nav
      // Clases dinámicas según el scroll
      className={`fixed w-full z-20 top-0 max-w-[1512px] transition-all duration-300 md:pt-10 ${
        scrolled ? "bg-white/10 backdrop-blur-sm md:py-6 rounded-b-xl" : "py-3"
      }`}
    >
      <div className="flex flex-wrap md:gap-0 items-center mx-auto p-4 w-full md:justify-center">
        {/* Selector de idioma visible solo en móvil */}
        <div className="flex flex-row w-full md:hidden">
          <a href="/" className="text-white flex justify-start z-1">
            <div className="flex w-8 items-center">
                <Code className="size-8" />
            </div>
          </a>
          <div className="flex w-full justify-center -ml-8">
            <LanguageSelector className="" />
          </div>
        </div>
        {/* Menú de navegación */}
        <div
          className={`items-start md:items-center w-full md:flex md:w-auto md:order-1 h-18 ${
        isOpen
          ? "flex max-md:min-h-[250px] max-md:max-w-[300px] max-md:border-2 max-md:border-white rounded-md max-md:bg-white/10 max-md:backdrop-blur-sm p-4"
          : "hidden max-h-0"
          }`}
          id="navbar-sticky"
        >
          <ul className="hidden md:flex md:p-0 font-medium md:space-x-8 ltr:space-x md:flex-row md:mt-0 md:border-0 items-center w-full justify-between gap-5 md:gap-0">
            {/* Renderiza los enlaces según la ruta actual */}
            {/^\/(es|en|de|fr)?\/?$/.test(window.location.pathname)
              ? [
                { key: "home", label: t("navbar.home") },
                { key: "about", label: t("navbar.about") },
                { key: "tech-stack", label: t("navbar.techstack") },
                { key: "experience", label: t("navbar.experience") },
                { key: "projects", label: t("navbar.projects") },
                { key: "certifications", label: t("navbar.certifications") },
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href={item.key === "home" ? "/" : undefined}
                    onClick={
                      item.key !== "home"
                        ? (e) => {
                            e.preventDefault();
                            const section = document.getElementById(item.key);
                            if (section) {
                              section.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        : undefined
                    }
                    className="language-selector__button text-white inline-flex items-center border-0 leading-8 gap-2 cursor-pointer 
                      relative after:absolute after:-bottom-3 after:left-0 after:h-[2px] 
                      after:w-0 after:bg-white after:transition-all after:duration-300 
                      hover:after:w-full"
                  >
                    <Poppins text={item.label} size="16|16" />
                  </a>
                </li>
              ))
              : [
                { key: "home", label: t("navbar.home") },
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href="/"
                    className="language-selector__button text-white inline-flex items-center border-0 leading-8 gap-2 cursor-pointer 
                      relative after:absolute after:-bottom-3 after:left-0 after:h-[2px] 
                      after:w-0 after:bg-white after:transition-all after:duration-300 
                      hover:after:w-full"
                  >
                    <Poppins text={item.label} size="16|16" />
                  </a>
                </li>
              ))}
          </ul>
          {/* Selector de idioma visible solo en escritorio */}
          <LanguageSelector className="hidden md:flex ml-3 md:ml-8" />
        </div>
      </div>
    </nav>
  );
}
