import en from 'assets/lang/en.json';
import zh from 'assets/lang/zh.json';
import ru from 'assets/lang/ru.json';
import ht from 'assets/lang/ht.json';
import bn from 'assets/lang/bn.json';
import ko from 'assets/lang/ko.json';
import es from 'assets/lang/es.json';

export const fallback = 'en';
export const defaultNamespace = 'common';
export const namespaces = ['common'];

export const supportedLocales = {
  bn: {
    name: 'বাংলা',
    ...bn
  },
  zh: {
    name: '中文',
    ...zh
  },
  en: {
    name: 'English',
    ...en
  },
  ht: {
    name: 'Kreyòl ayisyen',
    ...ht
  },
  ko: {
    name: '한국어',
    ...ko
  },
  ru: {
    name: 'русский',
    ...ru
  },
  es: {
    name: 'Español',
    ...es
  }
};
