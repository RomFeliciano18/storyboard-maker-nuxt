export const useCart = defineStore('cart', () => {
  const cart = reactive({
    products: [],
    add(item, activeIndex) {
      const {
        productCode,
        img,
        AdditionalBranding,
        hasBrandpatch,
        components = [],
        branloc = [],
        type,
        colors = [],
      } = item;

      if (!colors[activeIndex]) {
        console.warn('Invalid active color index.');
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

      const shouldSetKitNone = type !== 'giftset' || !components.length > 0;

      const bundledProduct = {
        productCode,
        color: colors[activeIndex].color,
        branding: branloc[0]?.branding || null,
        location: branloc[0]?.location || null,
        type,
        hex: colors[activeIndex].hex?.replace('#', '') || '',
        kit: shouldSetKitNone
          ? 'none'
          : `${productCode}-${cart.products.length + 1}`,
        combo: cart.products.length + 1,
        img: colors[activeIndex].display,
        AdditionalBranding,
        hasBrandpatch,
      };

      cart.products.push(bundledProduct);
      console.log('ITEMS IN CART: ', this.products);
    },
    remove(index) {
      if (index >= 0 && index < cart.products.length) {
        cart.products.splice(index, 1);
      }
    },
  });

  return cart;
});
