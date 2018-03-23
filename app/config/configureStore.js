import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer, { initialState as mainState } from '../containers/Main/module';
import globalSagas from './global-sagas';

const rootReducer = combineReducers({
  app: mainReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
];
const initialState = {
  app: mainState,
};

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(globalSagas);

