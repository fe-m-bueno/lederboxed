import i18n from './i18n';

export const moneyFixer = (money: number) => {
  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: 'USD',
  }).format(money);
};
