export const useCart = defineStore(
  'cart',
  () => {
    const productsState = useState('productsState');
    const modalState = useState('modalState');
    let comboCounter = 1;

    const products = ref([]);

    const add = async (item, activeIndex) => {
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

      // Type Checker
      const hasComponent = components.length > 0;
      const isNotebook = type === 'notebook' && hasComponent;
      const isGiftset = type === 'giftset' && hasComponent;

      const comboIndex = comboCounter;
      const kitId =
        isNotebook || isGiftset ? `${productCode}-${comboIndex}` : 'none';

      // For Notebook
      if (isNotebook) {
        // Checker if the notebook with the same color is already in the cart
        // const notebookAlreadyInCart = products.value.some(
        //   (p) =>
        //     p.productCode === productCode &&
        //     p.color === selectedColorData.color &&
        //     p.kit !== 'none'
        // );

        // if (notebookAlreadyInCart) {
        //   console.log('Notebook with same color already in cart.');
        //   return;
        // }

        const itemsToAdd = 1 + (isNotebook ? 1 : 0);
        const futureCartSize = products.value.length + itemsToAdd;
        if (futureCartSize > 15) {
          console.log(`Cannot add more than 15 products.`);
          return;
        }

        // Find the components information
        const firstCompCode = components[0];
        const matchedComponent = productsState.value.find(
          (p) => p.productCode === firstCompCode
        );
        if (!matchedComponent) {
          console.warn(`Notebook component ${firstCompCode} not found.`);
          return;
        }

        // Show modal for selecting component color
        return new Promise((resolve) => {
          modalState.value = {
            open: true,
            data: {
              component: matchedComponent,
              kitId,
              comboIndex,
              onConfirm: (selectedCompColor) => {
                // Push the main product
                products.value.push({
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
                });

                // Push the main products component
                products.value.push({
                  productCode: matchedComponent.productCode,
                  color: selectedCompColor.color,
                  branding: matchedComponent.branloc?.[0]?.branding || null,
                  location: matchedComponent.branloc?.[0]?.location || null,
                  type: matchedComponent.type,
                  hex: selectedCompColor.hex?.replace('#', '') || '',
                  kit: kitId,
                  combo: comboIndex,
                  img: selectedCompColor.display || '',
                  AdditionalBranding: matchedComponent.AdditionalBranding,
                  hasBrandpatch: matchedComponent.hasBrandpatch,
                });

                modalState.value = { open: false, data: {} };
                comboCounter++;
                console.log('ITEMS IN CART: ', products.value);
                resolve();
              },
            },
          };
        });
      }

      // General Checker of Already in Cart Standalone Product and Giftset
      let alreadyInCart = false;

      if (isGiftset) {
        const componentList = components.map((code) => ({
          productCode: code,
          color: selectedColorData.color,
        }));

        alreadyInCart = isComboDuplicate(
          productCode,
          selectedColorData.color,
          componentList
        );
      } else {
        alreadyInCart = products.value.some(
          (p) =>
            p.productCode === productCode &&
            p.color === selectedColorData.color &&
            p.kit === 'none'
        );
      }

      if (alreadyInCart) {
        console.log('Product or combo already in cart.');
        return;
      }

      const itemsToAdd = 1 + (isGiftset ? components.length : 0);
      const futureCartSize = products.value.length + itemsToAdd;
      if (futureCartSize > 15) {
        console.log(`Cannot add more than 15 products.`);
        return;
      }

      // Push main product
      products.value.push({
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
      });

      // Push giftset components
      if (isGiftset) {
        components.forEach((compCode) => {
          const matched = productsState.value.find(
            (p) => p.productCode === compCode
          );
          if (!matched) return;

          const sameColor = matched.colors.find(
            (c) => c.color === selectedColorData.color
          );

          products.value.push({
            productCode: matched.productCode,
            color: selectedColorData.color,
            branding: matched.branloc?.[0]?.branding || null,
            location: matched.branloc?.[0]?.location || null,
            type: matched.type,
            hex: sameColor?.hex?.replace('#', '') || '',
            kit: kitId,
            combo: comboIndex,
            img: sameColor?.display || '',
            AdditionalBranding: matched.AdditionalBranding,
            hasBrandpatch: matched.hasBrandpatch,
          });
        });
      }

      comboCounter++;
      console.log('ITEMS IN CART: ', products.value);
    };

    const remove = (index) => {
      const target = products.value[index];
      if (!target) return;

      if (target.kit !== 'none' && target.combo !== undefined) {
        const kitId = target.kit;
        const comboIndex = target.combo;

        for (let i = products.value.length - 1; i >= 0; i--) {
          const p = products.value[i];
          if (p.kit === kitId && p.combo === comboIndex) {
            products.value.splice(i, 1);
          }
        }
      } else {
        products.value.splice(index, 1);
      }
    };

    const removeAll = () => {
      products.value.splice(0);
      comboCounter = 1;
    };

    const isComboDuplicate = (mainCode, mainColor, componentList) => {
      return products.value.some((p) => {
        if (
          p.productCode !== mainCode ||
          p.color !== mainColor ||
          p.kit === 'none'
        )
          return false;

        const combo = p.combo;
        const kit = p.kit;

        const componentsInCart = products.value.filter(
          (c) =>
            c.kit === kit && c.combo === combo && c.productCode !== mainCode
        );

        if (componentsInCart.length !== componentList.length) return false;

        return componentList.every((comp) =>
          componentsInCart.some(
            (c) => c.productCode === comp.productCode && c.color === comp.color
          )
        );
      });
    };

    return {
      products,
      add,
      remove,
      removeAll,
      isComboDuplicate,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      paths: ['products'],
    },
  }
);
