import { createSelector } from "@reduxjs/toolkit";

export const cartItemSelector = (state) => state.cart.cartItems;

// count number of products in cart
export const cartItemCountSelector = createSelector(
  cartItemSelector,
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
)
// calculate total
export const cartTotalSelector = createSelector(
  cartItemSelector,
  (cartItems) => cartItems.reduce((total, item) => total + item.product.unitPrice * item.quantity, 0)
)
//
export const index = createSelector(
  cartItemSelector,
  (cartItems) => cartItems
)