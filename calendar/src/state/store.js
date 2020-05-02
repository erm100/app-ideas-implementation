import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import {reducers} from './reducers';
import {createKeychainStorage} from 'redux-persist-keychain-storage';

const keychainStorage = createKeychainStorage();

const persistConfig = {
  key: 'planner-app-root',
  keyPrefix: 'com.planner.persist.',
  storage: keychainStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers),
);
export const store = createStore(persistedReducer, applyMiddleware(logger));
export const persistor = persistStore(store);
