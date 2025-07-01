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

      const selectedColorData = colors[activeIndex];
      if (!selectedColorData) {
        console.error('Invalid active color index.');
        return;
      }

      const exists = cart.products.some(
        (p) =>
          p.productCode === productCode &&
          p.color?.toLowerCase() === selectedColorData.color?.toLowerCase()
      );

      if (exists) {
        console.log(
          `Product with code ${productCode} and color "${selectedColorData.color}" is already in the cart.`
        );
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

      // Main product (Giftset container or Single item)
      const mainProduct = {
        productCode,
        color: selectedColorData.color,
        branding: branloc[0]?.branding || null,
        location: branloc[0]?.location || null,
        type,
        hex: selectedColorData.hex?.replace('#', '') || '',
        kit: kitId,
        combo: comboIndex,
        img: selectedColorData.display,
        AdditionalBranding,
        hasBrandpatch,
      };

      cart.products.push(mainProduct);

      // For giftset, push each component using mainProduct's selected color
      if (isGiftset) {
        components.forEach((compCode) => {
          const matched = productsState.value.find(
            (p) => p.productCode === compCode
          );

          const sameProductColor = matched.colors.find(
            (sameColor) => sameColor.color === selectedColorData.color
          );

          if (matched) {
            const compItem = {
              productCode: matched.productCode,
              color: selectedColorData.color, // Use mainProduct's selected color
              branding: matched.branloc?.[0]?.branding || null,
              location: matched.branloc?.[0]?.location || null,
              type: matched.type,
              hex: sameProductColor?.hex?.replace('#', '') || '',
              kit: kitId,
              combo: comboIndex,
              img: sameProductColor?.display || '',
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
