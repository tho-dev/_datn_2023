import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slice
import globalSlice from "./slices/globalSlice";
import cartSlice from "./slices/cartSlice";


//api
import authApi from "../redux/api/user";
import productApi from "./api/product";
import cartApi from "./api/cart";
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['_persist']
}

const rootReducer = combineReducers({
    global: globalSlice,
    cart: cartSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [authApi.middleware, productApi.middleware, cartApi.middleware]
const store = configureStore({
    reducer: {
        persistedReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(...middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
export const persistor = persistStore(store);