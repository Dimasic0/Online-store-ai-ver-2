export const selectProducts = (state) => state.products;

export const selectProductById = (state, id) =>
  state.products.find((product) => product.id === id);

