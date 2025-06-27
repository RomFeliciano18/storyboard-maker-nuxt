export const useCart = defineStore('cart', () => {
  const cart = reactive({
    products: [],
    add(item) {
      const exists = this.products.some((p) => p.id === item.id);

      if (exists) {
        console.log(`Product with id ${item.id} is already in the cart.`);
        return;
      }

      if (this.products.length >= 15) {
        console.log('Cannot add more than 15 products to the cart.');
        return;
      }

      this.products.push(item);
    },
  });

  return cart;
});
