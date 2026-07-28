import {create} from "zustand";
import {useEffect, useState} from "react";

export interface CartState {
  products: Array<Product & {quantity: string}>;
  addToCart: (product: Product) => void;
  reduceFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  items: () => number;
  total: () => string;
}

const loadFromStorage = (): Array<Product & {quantity: string}> => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (products: Array<Product & {quantity: string}>) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(products));
    } catch {
      // Storage full or unavailable — silently ignore
    }
  }
};

const useCartStore = create<CartState>((set, get) => ({
  products: [],

  addToCart: (product: Product) =>
    set((state) => {
      let hasProduct = false;
      const products = state.products.map((p) => {
        if (p.id === product.id) {
          hasProduct = true;
          return {
            ...p,
            quantity: (parseInt(p.quantity) + 1).toString(),
          };
        }
        return p;
      });

      const updatedProducts = hasProduct
        ? products
        : [...state.products, {...product, quantity: "1"}];
      saveToStorage(updatedProducts);
      return {products: updatedProducts};
    }),

  reduceFromCart: (product: Product) =>
    set((state) => {
      const updatedProducts = state.products
        .map((p) => {
          if (p.id === product.id) {
            return {...p, quantity: (parseInt(p.quantity) - 1).toString()};
          }
          return p;
        })
        .filter((p) => parseInt(p.quantity) > 0);
      saveToStorage(updatedProducts);
      return {products: updatedProducts};
    }),

  removeFromCart: (product: Product) =>
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== product.id);
      saveToStorage(updatedProducts);
      return {products: updatedProducts};
    }),

  clearCart: () =>
    set(() => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      return {products: []};
    }),

  items: () => get().products.reduce((acc, p) => acc + parseInt(p.quantity), 0),

  total: () =>
    get()
      .products.reduce(
        (acc, p) =>
          acc +
          (typeof p.price === "number"
            ? p.price
            : parseFloat(p.price || "0")) *
            parseInt(p.quantity || "1"),
        0,
      )
      .toFixed(2),
}));

export function useHydratedCartStore() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.length > 0) {
      useCartStore.setState({products: stored});
    }
    setHydrated(true);
  }, []);

  return hydrated ? useCartStore : null;
}

export default useCartStore;
