export const useProducts = () => {
  return useFetch(`${productionApi()}/product/region/us/en`);
};

export const useFeaturedProducts = () => {
  return useFetch('http://20.123.82.238:7800/feature/active');
};
