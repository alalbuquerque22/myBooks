import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
//import {consumeActionMiddleware,suspendSaga,offlineMiddleware} from 'redux-offline-queue;

import rootReducer from './modules/rootReducer';
import persistedReducer from './persistReducers';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

//const middlewares = []
// middlewares.push(offlineMiddleware())
// middlewares.push(suspendSaga(sagaMiddleware))
// middlewares.push(consumeActionMiddleware())
//const middleware = applyMiddleware(...middlewares)
const middlewares = applyMiddleware(sagaMiddleware);

const store = createStore(persistedReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor};
