import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {UsersReducer} from '../features/users/UsersSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import {CocktailsPageReducer} from "../features/CocktailsPage/CocktailsPageSlice";

const usersPersistConfig = {
	key: 'cocktails:users',
	storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	users: persistReducer(usersPersistConfig, UsersReducer),
	cocktails: CocktailsPageReducer
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;