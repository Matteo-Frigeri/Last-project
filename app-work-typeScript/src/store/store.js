import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../reducers/favoriteReducers";

// Configurazione dello store Redux
const store = configureStore({
    reducer: favoritesReducer
});

export default store;