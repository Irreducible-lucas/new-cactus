import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the shape of cart items
export type CartItem = {
  id: string;
  name: string;
  category: "frame" | "painting" | "decor" | "furniture";
  price: number;
  quantity: number;
  image: string;
  inStock?: boolean;
};

// Define the shape of cart state
interface CartState {
  items: CartItem[];
}

// Load from localStorage if available
let savedCart: CartItem[] = [];
try {
  const stored = localStorage.getItem("cartItems");
  savedCart = stored ? JSON.parse(stored) : [];
} catch (error) {
  console.error("Failed to parse cart from localStorage:", error);
}

const initialState: CartState = {
  items: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
