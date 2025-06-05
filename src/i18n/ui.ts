// Importa archivos JSON con las traducciones para cada idioma
import es from './messages/es.json';
import en from './messages/en.json';
import fr from './messages/fr.json';
import de from './messages/de.json';

// Diccionario de códigos de idioma con sus etiquetas visibles
export const languages = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
};

// Idioma por defecto
export const defaultLang = 'es';

// Objeto que contiene los textos traducidos por idioma
export const ui = {
  en,
  es,
  fr,
  de
} as const; // `as const` asegura que los valores sean tratados como constantes literal
