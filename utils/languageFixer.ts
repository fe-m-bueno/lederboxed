import i18n from './i18n';
export const languageFixer = (language: string) => {
  const languageObj = new Intl.DisplayNames([i18n.language], {
    type: 'language',
  });
  return languageObj.of(language);
};
