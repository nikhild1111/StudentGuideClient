
import { createSlice } from "@reduxjs/toolkit";


const savedItems = Array.isArray(JSON.parse(localStorage.getItem("cart")))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
  // Utility function
const calculateCart = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.count * item.price, 0);
  return { totalItems, totalPrice };
};

const { totalItems, totalPrice } = calculateCart(savedItems);

const initialState = {
  items: savedItems,
  totalItems,
  totalPrice,
};



const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(p => p._id === item._id);

      if (existing) {
        const totalCount = existing.count + item.count;

        if (totalCount <= existing.quantity) {
          existing.count += item.count;
          console.log(existing);
          existing.quantity -= item.count; // 🆕 reduce stock
        } else {
          const allowed = existing.quantity;
          existing.count += allowed;
          existing.quantity = 0; // no more left
        }
      } else {
        // add to cart, reduce quantity by count
        const countToAdd = Math.min(item.count || 1, item.quantity);
        // console.log("in the cart",countToAdd)
        // console.log("in the cart",item.quantity)
        state.items.push({ ...item, count: countToAdd, quantity: item.quantity - countToAdd }); // 🆕 adjusted
      }

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    //   console.log(totalItems);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseCount: (state, action) => {
      const productId = action.payload;
      const product = state.items.find(p => p._id === productId);

      if (product && product.quantity > 0) {
        product.count += 1;
        product.quantity -= 1; // 🆕 reduce stock
        localStorage.setItem("cart", JSON.stringify(state.items));
      }

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    decreaseCount: (state, action) => {
      const productId = action.payload;
      const product = state.items.find(p => p._id === productId);

      if (product && product.count > 1) {
        product.count -= 1;
        product.quantity += 1; // 🆕 give back stock
      } else if (product && product.count === 1) {
        // remove item and restore stock
        state.items = state.items.filter(p => p._id !== productId);
      }

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    remove: (state, action) => {
      const id = action.payload;
      const item = state.items.find(p => p._id === id);

      if (item) {
        // Restore the quantity back to full (for UI or backend fetch)
        item.quantity += item.count;
      }

      state.items = state.items.filter(p => p._id !== id);

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },

    setCart: (state, action) => {
      state.items = action.payload;
      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  add,
  remove,
  clearCart,
  setCart,
  increaseCount,
  decreaseCount,
} = cartSlice.actions;
export default cartSlice.reducer;









