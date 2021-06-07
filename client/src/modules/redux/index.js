import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import rootSaga from "./saga";
import createSagaMiddleware from "@redux-saga/core";

const saga = createSagaMiddleware();
//redux dev tool
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(saga));

const store = createStore(reducer, enhancer);

saga.run(rootSaga);

export default store;