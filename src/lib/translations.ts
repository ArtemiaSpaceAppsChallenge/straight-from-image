import { Language } from '@/contexts/LanguageContext';

export const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  pt: { name: 'Português', flag: '🇧🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  cs: { name: 'Čeština', flag: '🇨🇿' },
  el: { name: 'Ελληνικά', flag: '🇬🇷' },
  la: { name: 'Latina', flag: '🏛️' },
};

export const translations = {
  en: {
    home: 'HOME',
    about: 'ABOUT',
    roadmap: 'ROADMAP',
    play: 'PLAY',
  },
  pt: {
    home: 'INÍCIO',
    about: 'SOBRE',
    roadmap: 'ROTEIRO',
    play: 'JOGAR',
  },
  es: {
    home: 'INICIO',
    about: 'ACERCA',
    roadmap: 'HOJA DE RUTA',
    play: 'JUGAR',
  },
  it: {
    home: 'HOME',
    about: 'CHI SIAMO',
    roadmap: 'ROADMAP',
    play: 'GIOCA',
  },
  ja: {
    home: 'ホーム',
    about: '概要',
    roadmap: 'ロードマップ',
    play: 'プレイ',
  },
  ko: {
    home: '홈',
    about: '소개',
    roadmap: '로드맵',
    play: '플레이',
  },
  cs: {
    home: 'DOMŮ',
    about: 'O NÁS',
    roadmap: 'PLÁN',
    play: 'HRÁT',
  },
  el: {
    home: 'ΑΡΧΙΚΗ',
    about: 'ΣΧΕΤΙΚΑ',
    roadmap: 'ΧΑΡΤΗΣ',
    play: 'ΠΑΙΞΕ',
  },
  la: {
    home: 'DOMUS',
    about: 'DE NOBIS',
    roadmap: 'VIA',
    play: 'LUDERE',
  },
};

export const useTranslations = (language: Language) => {
  return translations[language];
};
