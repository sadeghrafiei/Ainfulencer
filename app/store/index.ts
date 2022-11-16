import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

import rootSaga from './sagas';
import rootReducers from './reducers';

const persistConfig = {
  key: 'elegant',
  storage: AsyncStorage,
  whitelist: ['user', 'todos', 'app', 'appearance'],
};

const persistedReducers = persistReducer(persistConfig, rootReducers);

const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: persistedReducers,
  middleware,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};
