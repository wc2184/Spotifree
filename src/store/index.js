import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import playerReducer from "./player";
import searchReducer from "./search";
import playlistReducer from "./playlist";

const rootReducer = combineReducers({
  session: sessionReducer,
  player: playerReducer,
  search: searchReducer,
  playlist: playlistReducer,
});

// let enhancer;

// if (process.env.NODE_ENV === 'production') {
//     enhancer = applyMiddleware(thunk);
// } else {
//     const logger = require('redux-logger').default;
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// const configureStore = (preloadedState) => {
//     return createStore(rootReducer, preloadedState, enhancer);
// }
const configureStore = (preloadedState) => {
  // return createStore(rootReducer, preloadedState, enhancer);
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;
