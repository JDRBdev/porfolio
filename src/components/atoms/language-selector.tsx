// Importa React y dependencias necesarias
import React from "react";
import { languages } from "../../i18n/ui"; // Diccionario de idiomas disponibles
import { useLanguage } from "../../hooks/useLanguage"; // Hook personalizado para manejar el idioma actual
import { Poppins } from "./text/poppins"; // Componente para mostrar texto con estilo

// Componente funcional que renderiza el selector de idioma
export function LanguageSelector({ className = "" }) {
  // Se obtienen desde el hook:
  // lang: idioma actual
  // t: función de traducción (no se usa aquí)
  // setLang: función para cambiar el idioma
  const { lang, t, setLang } = useLanguage();

  return (
    // Contenedor del selector con clases de estilo y borde
    <div className={`flex border-2 border-white rounded-xl select-none text-white ${className}`}>
      {/* Itera sobre todos los idiomas disponibles */}
      {Object.entries(languages).map(([languageCode, label], index) => {
        // Asigna clases para redondear esquinas izquierda y derecha
        const roundedClass =
          index === 0
            ? "rounded-l-lg" // Primera opción: esquina izquierda redondeada
            : index === Object.entries(languages).length - 1
            ? "rounded-r-lg" // Última opción: esquina derecha redondeada
            : "";

        return (
          // Etiqueta para cada opción de idioma
          <label
            key={languageCode}
            className="radio flex flex-grow items-center justify-center rounded-lg cursor-pointer"
          >
            {/* Input tipo radio oculto, con manejo de cambio */}
            <input
              type="radio"
              name="radio"
              value={languageCode}
              className="peer hidden"
              checked={lang === languageCode} // Seleccionado si coincide con idioma actual
              onChange={() => setLang(languageCode as "en" | "es" | "fr" | "de")} // Cambio de idioma
            />
            {/* Span que se estiliza cuando el input está seleccionado */}
            <span
              className={`tracking-widest bg-white/10 text-white peer-checked:bg-black/10 p-3 ${roundedClass}`}
            >
              {/* Texto del idioma usando componente Poppins */}
              <Poppins
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