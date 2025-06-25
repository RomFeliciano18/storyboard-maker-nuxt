export const useProducts = () => {
  const { locale } = useI18n();

  let region = 'us';
  let lang = 'en';

  switch (locale.value) {
    case 'en':
      region = 'us';
      lang = 'en';
      break;
    case 'fr':
      region = 'ca';
      lang = 'fr';
      break;
    default:
      region = 'us';
      lang = 'en';
  }

  const url = `${productionApi()}/product/region/${region}/${lang}`;
  return useFetch(url);
};

export const useFeaturedProducts = () => {
  return useFetch(productionFeatApi());
};
