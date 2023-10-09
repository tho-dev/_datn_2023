import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalSlice from "./slices/globalSlice";


//api
import authApi from "../redux/api/user";
import brandApi from "../redux/api/brand";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['_persist']
}

const rootReducer = combineReducers({
    global: globalSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [authApi.middleware, brandApi.middleware];
const store = configureStore({
    reducer: {
        persistedReducer,
        [authApi.reducerPath]: authApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(...middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
export const persistor = persistStore(store);