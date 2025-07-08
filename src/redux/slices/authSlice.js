import { TOKEN } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: Cookies.get(TOKEN) ? true : false,
    cart: [],
    favorites: []
  },
  reducers: {
    login: (state, action) => {
      state.auth = true;
      Cookies.set(TOKEN, action.payload.token);
    },
    logout: (state) => {
      state.auth = false;
      Cookies.remove(TOKEN);
    },
    addToCart: (state, action) => {
      const exisiting = state.cart.find((el) => el.id === action.payload.id);
      if (exisiting) {
        exisiting.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteProduct: (state, action) => {
      const item = state.cart.filter((el) => el.id !== action.payload);
      state.cart = item;
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((el) => el.id === action.payload);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((el) => el.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cart = state.cart.filter((el) => el.id !== action.payload);
        }
      }
    },
    favoriteProduct: (state, action) => {
      const index = state.favorites.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push({ ...action.payload });
      }
    },
    deleteAllProducts: (state) => {
      state.cart = [];
    },
     deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter((el) => el.id !== action.payload);
    },
    deleteAllFavorites: (state) => {
      state.favorites = [];
    },
  }
});

export const { login, logout, addToCart, deleteProduct, incrementQuantity, decrementQuantity, deleteAllProducts, favoriteProduct, deleteAllFavorites, deleteFavorite } = authSlice.actions;
export default authSlice.reducer;
