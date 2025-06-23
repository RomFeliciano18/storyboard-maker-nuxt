const productionApi = (isProduction = false) => {
  const config = useRuntimeConfig();
  return isProduction ? config.public.apiProd : config.public.apiDev;
};

export default productionApi;
