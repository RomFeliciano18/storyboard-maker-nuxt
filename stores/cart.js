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

      const isGiftset = type === 'giftset' && components.length > 0;
      const comboIndex = comboCounter;
      const kitId = isGiftset ? `${productCode}-${comboIndex}` : 'none';

      const alreadyInCart = cart.products.some(
        (p) =>
          p.productCode === productCode &&
          p.color?.toLowerCase() === selectedColorData.color?.toLowerCase() &&
          ((!isGiftset && p.kit === 'none') ||
            (isGiftset && p.kit !== 'none' && p.combo !== undefined))
      );

      if (alreadyInCart) {
        console.log(
          `Standalone product ${productCode} with color "${selectedColorData.color}" is already in the cart.`
        );
        return;
      }

      const itemsToAdd = 1 + (isGiftset ? components.length : 0);
      const futureCartSize = cart.products.length + itemsToAdd;

      if (futureCartSize > 15) {
        console.log(
          `Cannot add ${itemsToAdd} item(s): Cart would exceed the 15-product limit.`
        );
        return;
      }

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

      if (isGiftset) {
        components.forEach((compCode) => {
          const matched = productsState.value.find(
            (p) => p.productCode === compCode
          );
          if (!matched) {
            console.warn(`Component ${compCode} not found in productsState.`);
            return;
          }

          const sameProductColor = matched.colors.find(
            (c) => c.color === selectedColorData.color
          );

          const compItem = {
            productCode: matched.productCode,
            color: selectedColorData.color,
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
        });
      }

      comboCounter++;
      console.log('ITEMS IN CART: ', cart.products);
    },

    remove(index) {
      const target = this.products[index];
      if (!target) return;

      if (target.kit !== 'none' && target.combo !== undefined) {
        const kitId = target.kit;
        const comboIndex = target.combo;

        for (let i = this.products.length - 1; i >= 0; i--) {
          const p = this.products[i];
          if (p.kit === kitId && p.combo === comboIndex) {
            this.products.splice(i, 1);
          }
        }
      } else {
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
