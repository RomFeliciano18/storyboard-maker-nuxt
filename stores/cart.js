export const useCart = defineStore('cart', () => {
  const productsState = useState('productsState');
  let comboCounter = 1;

  const cart = reactive({
    products: [],
    add(item, activeIndex) {
      const {
        productCode,
        AdditionalBranding,
        hasBrandpatch,
        components = [],
        branloc = [],
        type,
        colors = [],
      } = item;

      console.log('Full Product Details: ', item);

      if (!colors[activeIndex]) {
        console.error('Invalid active color index.');
        return;
      }

      const exists = cart.products.some((p) => p.productCode === productCode);

      if (exists) {
        console.log(`Product with code ${productCode} is already in the cart.`);
        return;
      }

      if (cart.products.length >= 15) {
        console.log('Cannot add more than 15 products to the cart.');
        return;
      }

      const isGiftset = type === 'giftset' && components.length > 0;
      const kitId = isGiftset
        ? `${productCode}-${cart.products.length + 1}`
        : 'none';
      const comboIndex = comboCounter;

      const mainProduct = {
        productCode,
        color: colors[activeIndex].color,
        branding: branloc[0]?.branding || null,
        location: branloc[0]?.location || null,
        type,
        hex: colors[activeIndex].hex?.replace('#', '') || '',
        kit: kitId,
        combo: comboIndex,
        img: colors[activeIndex].display,
        AdditionalBranding,
        hasBrandpatch,
      };

      cart.products.push(mainProduct);

      if (isGiftset) {
        components.forEach((compCode) => {
          const matched = productsState.value.find(
            (p) => p.productCode === compCode
          );
          if (matched) {
            const compItem = {
              productCode: matched.productCode,
              color: matched.colors?.[activeIndex]?.color || '',
              branding: matched.branloc?.[0]?.branding || null,
              location: matched.branloc?.[0]?.location || null,
              type: matched.type,
              hex: matched.colors?.[activeIndex]?.hex?.replace('#', '') || '',
              kit: kitId,
              combo: comboIndex,
              img: matched.colors?.[activeIndex]?.display || matched.img || '',
              AdditionalBranding: matched.AdditionalBranding,
              hasBrandpatch: matched.hasBrandpatch,
            };
            cart.products.push(compItem);
          } else {
            console.warn(
              `Component with code ${compCode} not found in productsState.`
            );
          }
        });
      }

      comboCounter++;
      console.log('ITEMS IN CART: ', this.products);
    },
    remove(index) {
      if (index >= 0 && index < this.products.length) {
        this.products.splice(index, 1);
      }
    },
    removeAll() {
      this.products.splice(0);
      comboCounter = 1;
    },
  });

  return cart;
});
