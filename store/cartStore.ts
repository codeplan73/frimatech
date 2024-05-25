import { create } from "zustand";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addToCart: (product: Product) => void;
  reduceFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  items: () => number;
  total: () => string;
}

const useCartStore = create<CartState>((set, get) => ({
  products: JSON.parse(localStorage.getItem("cart") || "[]"),
  addToCart: (product: Product) =>
    set((state) => {
      let hasProduct = false;
      const products = state.products.map((p) => {
        if (p.id === product.id) {
          hasProduct = true;
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });

      const updatedProducts = hasProduct
        ? products
        : [...state.products, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),

  reduceFromCart: (product: Product) =>
    set((state) => {
      const updatedProducts = state.products
        .map((p) => {
          if (p.id === product.id) {
            return { ...p, quantity: p.quantity - 1 };
          }
          return p;
        })
        .filter((p) => p.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),

  removeFromCart: (product: Product) =>
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return { products: [] };
    }),

  items: () => get().products.reduce((acc, p) => acc + p.quantity, 0),

  total: () =>
    get()
      .products.reduce((acc, p) => acc + parseFloat(p.price) * p.quantity, 0)
      .toFixed(2),
}));

export default useCartStore;
