import { ui, defaultLang } from './ui';

export type AvailableLang = keyof typeof ui;

/**
 * Recursively creates dot-notated key paths from a nested object type.
 */
type DotNestedKeys<T> = {
  [K in keyof T & string]: T[K] extends Record<string, any>
    ? `${K}` | `${K}.${DotNestedKeys<T[K]>}`
    : `${K}`;
}[keyof T & string];

export type TranslationKey = DotNestedKeys<typeof ui[typeof defaultLang]>;

/**
 * Gets language from URL path, like `/es/page`
 */
export function getLangFromUrl(url: URL): AvailableLang {
  const [, lang] = url.pathname.split('/');
  return (lang in ui ? lang : defaultLang) as AvailableLang;
}

/**
 * Utility to safely get a value from an object using dot-notation.
 */
function get(obj: any, path: string, fallback?: string): string {
  return path
    .split('.')
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj) ?? fallback ?? path;
}

/**
 * Returns a translation function `t('key')` for a given language.
 */
export function useTranslations(lang: AvailableLang) {
  return function t(key: TranslationKey): string {
    return get(ui[lang], key, get(ui[defaultLang], key, key));
  };
}
