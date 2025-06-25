export const productionApi = (isProduction = false) => {
  const config = useRuntimeConfig();
  return isProduction ? config.public.apiProd : config.public.apiDev;
};

export const productionFeatApi = (isProduction = false) => {
  const config = useRuntimeConfig();
  return isProduction ? config.public.apiFeatProd : config.public.apiFeatDev;
};
