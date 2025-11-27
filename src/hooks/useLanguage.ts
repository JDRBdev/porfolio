import { useEffect, useState } from "react";
import { defaultLang, languages } from "@i18n/ui";
import type { AvailableLang } from "@i18n/utils";
import { useTranslations } from "@i18n/utils";

/**
 * Hook personalizado para manejar el idioma de la aplicación.
 */
export const useLanguage = () => {
  const [lang, setLang] = useState<AvailableLang>(defaultLang);

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage") as AvailableLang | null;

    // Obtiene los segmentos de la URL para identificar el idioma
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const urlLang = pathSegments[0] as AvailableLang;

    let detectedLang: AvailableLang;

    // Prioriza el idioma almacenado localmente
    if (storedLang && languages[storedLang]) {
      detectedLang = storedLang;
      // Si la URL no coincide con el idioma almacenado, redirige
      if (urlLang !== storedLang) {
        window.location.href = `/${storedLang}/`;
        return;
      }
    }
    // Si el idioma de la URL es válido, lo usa
    else if (languages[urlLang]) {
      detectedLang = urlLang;
    }
    // En cualquier otro caso, usa el idioma por defecto y redirige
    else {
      detectedLang = defaultLang;
      window.location.href = `/${defaultLang}/`;
      return;
    }

    // Establece el idioma detectado y lo guarda en localStorage
    setLang(detectedLang);
    localStorage.setItem("preferredLanguage", detectedLang);
  }, []);

  /**
   * Cambia manualmente el idioma y redirige manteniendo la ruta.
   */
  const setLangManual = (newLang: AvailableLang) => {
    if (languages[newLang]) {
      setLang(newLang);
      localStorage.setItem("preferredLanguage", newLang);

      // Extrae el path sin el primer segmento (idioma actual)
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const restPath = pathSegments.slice(1).join("/");

      // Redirige a la nueva URL con el idioma actualizado
      const newUrl = `/${newLang}${restPath ? "/" + restPath : "/"}`;
      window.location.href = newUrl;
    }
  };

  // Crea función `t(key)` para traducir usando el idioma actual
  const t = useTranslations(lang);

  return { lang, t, setLang: setLangManual };
};