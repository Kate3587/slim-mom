import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReduser } from './auth/slice.auth';

const persistConfigAuth = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isAuth', 'user'],
};

const persistedAuth = persistReducer(persistConfigAuth, authReduser);

const store = configureStore({
  reducer: {
    auth: persistedAuth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

const persistor = persistStore(store);

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}