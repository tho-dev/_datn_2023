import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from "./slices/userSlice";


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['_persist']
}

const rootReducer = combineReducers({
    user: userSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
export const persistor = persistStore(store);