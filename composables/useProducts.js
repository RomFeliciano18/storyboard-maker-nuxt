export const useProducts = () => {
  const { locale } = useI18n();
  const productsState = useState('productsState', () => []);
  const lastLocale = useState('lastLocale', () => '');

  const regionLangMap = {
    en: { region: 'us', lang: 'en' },
    fr: { region: 'ca', lang: 'fr' },
  };

  const { region, lang } = regionLangMap[locale.value] || regionLangMap.en;

  const url = `${productionApi()}/product/region/${region}/${lang}`;

  const shouldRefetch =
    !productsState.value.length || lastLocale.value !== locale.value;

  if (shouldRefetch) {
    const { data, status } = useFetch(url, {
      key: `products-${locale.value}`,
    });

    watch(data, (newData) => {
      if (newData?.products?.length) {
        productsState.value = newData.products;
        lastLocale.value = locale.value;
      }
    });

    return { data, status };
  }

  return {
    data: ref({ products: productsState.value }),
    status: 'success',
  };
};

export const useFeaturedProducts = () => {
  const featuredProductsState = useState('featuredProductsState', () => ({}));
  const shouldFetch = !Object.keys(featuredProductsState.value)?.length;

  const url = productionFeatApi();

  if (shouldFetch) {
    const { data, status } = useFetch(url, {
      key: 'featured-products',
    });

    return { data, status };
  }

  return {
    data: ref(featuredProductsState.value),
    status: 'success',
  };
};
