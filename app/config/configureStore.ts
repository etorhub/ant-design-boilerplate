import createSagaMiddleware from 'redux-saga';
import type { Reducer } from 'redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import mainReducer, { initialState as mainState } from '@/containers/Main/module';
import globalSagas from '@/config/global-sagas';
import type { RootState } from '@/types';

const rootReducer = combineReducers({
  app: mainReducer,
}) as unknown as Reducer<RootState>;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const initialState: RootState = {
  app: mainState,
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(globalSagas);

export default store;
