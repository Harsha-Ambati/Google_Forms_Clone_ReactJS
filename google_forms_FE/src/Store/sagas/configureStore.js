import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import  rootSaga  from "./rootSaga";
import questionsReducer from "../reducer/questions";
import signupReducer from "../reducer/signup";
import loginReducer from "../reducer/login";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({

  questionsReducer,
  signupReducer,
  loginReducer,
});


const persistConfig = {
  key : 'persist',
  storage
}

const persistedReducer = persistReducer(persistConfig,reducer)

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer,{},composeEnhancers(applyMiddleware(...middleware)));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export default store;
export {persistor}