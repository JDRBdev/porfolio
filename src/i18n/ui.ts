import { Navbar } from "../components/organism/navbar";

export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export const defaultLang = 'en';

export const ui = {
    en: {
        navbar: {
            home: 'Home',
            about: 'About',
            techstack: 'Tech Stack',
            projects: 'Projects',
            contact: 'Contact',
            languages: "Language"
        }
    },
    es: {
        navbar: {
            home: 'Inicio',
            about: 'Sobre mi',
            techstack: 'Conocimientos',
            projects: 'Proyectos',
            contact: 'Contacto',
            languages: "Idioma"
        }
    },
    fr: {
        navbar: {
            home: 'Accueil',
            about: 'À propos',
            techstack: 'Technologies',
            projects: 'Projets',
            contact: 'Contact',
            languages: "Langue"
        }
    },
    de: {
        navbar: {
            home: 'Startseite',
            about: 'Über mich',
            techstack: 'Technologie-Stack',
            projects: 'Projekte',
            contact: 'Kontakt',
            languages: "Sprache"
        }
    }
} as const;