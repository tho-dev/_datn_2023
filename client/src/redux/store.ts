import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slice
import globalSlice from "./slices/globalSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";
//api
import authApi from "../redux/api/user";
import productApi from "./api/product";
import cartApi from "./api/cart";
import orderApi from "./api/order";
import brandApi from "../redux/api/brand";
import categoryApi from "../redux/api/category";
import demandApi from "../redux/api/demand";
import collectionApi from "../redux/api/collection";
import postApi from "./api/post";
import notificationApi from "./api/notification";
import generalApi from "./api/general";
import promotionApi from "./api/promotion";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["_persist"],
};

const rootReducer = combineReducers({
	global: globalSlice,
	cart: cartSlice,
	user: userSlice,
	order: orderSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
	authApi.middleware,
	productApi.middleware,
	cartApi.middleware,
	orderApi.middleware,
	categoryApi.middleware,
	brandApi.middleware,
	demandApi.middleware,
	collectionApi.middleware,
	postApi.middleware,
	notificationApi.middleware,
	promotionApi.middleware,
	generalApi.middleware,
];

const store = configureStore({
	reducer: {
		persistedReducer,
		[authApi.reducerPath]: authApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[brandApi.reducerPath]: brandApi.reducer,
		[demandApi.reducerPath]: demandApi.reducer,
		[collectionApi.reducerPath]: collectionApi.reducer,
		[postApi.reducerPath]: postApi.reducer,
		[notificationApi.reducerPath]: notificationApi.reducer,
		[generalApi.reducerPath]: generalApi.reducer,
		[promotionApi.reducerPath]: promotionApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
