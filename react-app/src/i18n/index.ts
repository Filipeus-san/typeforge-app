import { cs } from './cs';
import { en } from './en';
import { useLanguage, type Language } from '../context/LanguageContext';

const translations: Record<Language, typeof en> = { cs, en };

type TranslationKeys = keyof typeof en;

export function useT(): typeof en;
export function useT<K extends TranslationKeys>(namespace: K): (typeof en)[K];
export function useT(namespace?: string) {
  const { lang } = useLanguage();
  const t = translations[lang];
  if (namespace !== undefined) {
    return (t as any)[namespace];
  }
  return t;
}

export function getT(): typeof en;
export function getT<K extends TranslationKeys>(namespace: K): (typeof en)[K];
export function getT(namespace?: string) {
  const lang = (typeof window !== 'undefined' && (window as any).__LANG__) || 'en';
  const validLang = (lang === 'cs' || lang === 'en') ? lang : 'en';
  const t = translations[validLang as Language];
  if (namespace !== undefined) {
    return (t as any)[namespace];
  }
  return t;
}

export type Translations = typeof en;
export type { Language };
