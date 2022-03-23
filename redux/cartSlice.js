import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
    quantity: Cookies.get("quantity") ? JSON.parse(Cookies.get("quantity")) : 0,
    total: Cookies.get("total") ? JSON.parse(Cookies.get("total")) : 0,
  },
  reducers: {
    addProduct: (state, { payload }) => {
      state.products.push(payload);
      state.quantity += 1;
      state.total += payload.price * payload.quantity;
      Cookies.set("cart", JSON.stringify(state.products));
      Cookies.set("quantity", JSON.stringify(state.quantity));
      Cookies.set("total", JSON.stringify(state.total));
    },
    reset: (state) => {
      Cookies.remove("cart");
      Cookies.remove("quantity");
      Cookies.remove("total");
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
