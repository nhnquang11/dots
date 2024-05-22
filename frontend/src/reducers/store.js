
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version:1
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)
