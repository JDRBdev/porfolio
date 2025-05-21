import es from './messages/es.json';
import en from './messages/en.json';
import fr from './messages/fr.json';
import de from './messages/de.json';

export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export const defaultLang = 'en';

export const ui = {
  en,
  es,
  fr,
  de
} as const;