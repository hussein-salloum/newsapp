import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from 'redux-persist';
import headlinesReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['headlines']
};

const rootReducer = combineReducers({
  headlinesReducer: persistReducer(persistConfig, headlinesReducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
