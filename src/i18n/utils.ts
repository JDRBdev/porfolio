import { ui, defaultLang } from './ui';

// Define un tipo que representa los idiomas disponibles (en, es, fr, de)
export type AvailableLang = keyof typeof ui;

/**
 * Tipo utilitario recursivo que genera las claves de traducción
 * en formato de notación con punto: por ejemplo 'home.title'
 */
type DotNestedKeys<T> = {
  [K in keyof T & string]: T[K] extends Record<string, any>
    ? `${K}` | `${K}.${DotNestedKeys<T[K]>}`
    : `${K}`;
}[keyof T & string];

// Tipo para representar claves válidas dentro del archivo de idioma por defecto
export type TranslationKey = DotNestedKeys<typeof ui[typeof defaultLang]>;

/**
 * Extrae el idioma desde la URL (por ejemplo: /es/pagina)
 */
export function getLangFromUrl(url: URL): AvailableLang {
  const [, lang] = url.pathname.split('/');
  return (lang in ui ? lang : defaultLang) as AvailableLang;
}

/**
 * Accede de forma segura a un valor dentro de un objeto usando notación con punto.
 * Ejemplo: get(obj, 'home.title') devolverá obj.home.title
 */
function get(obj: any, path: string, fallback?: string): string {
  return path
    .split('.')
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj)
    ?? fallback ?? path;
}

/**
 * Retorna una función de traducción `t('clave')` para el idioma dado.
 */
export function useTranslations(lang: AvailableLang) {
  return function t(key: TranslationKey): string {
    // Busca la traducción en el idioma actual y si no existe, en el idioma por defecto.
    return get(ui[lang], key, get(ui[defaultLang], key, key));
  };
}