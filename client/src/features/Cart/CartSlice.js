import { Update } from '@material-ui/icons';
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    setNullCartItem(state) {
      state.cartItems = []
    },
    showMiniCart(state) {
      state.showMiniCart = true
    },
    hideMiniCart(state) {
      state.showMiniCart = false
    },
    addToCart(state, action) {
      // newItem ={id, product, quantity}
      const newItem = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === newItem.id)
      if (index >= 0) {
        // update quantity
        state.cartItems[index].quantity += newItem.quantity
      } else {
        // add to cart
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === id)
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      const idNeedRemove = action.payload;
      state.cartItems = state.cartItems.filter(x => x.id !== idNeedRemove);
    },
    findIndexItem(state, action) {
      const id = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === id)
      return index
    }
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart, findIndexItem, setNullCartItem } = actions; // name export
export default reducer; // defaul export