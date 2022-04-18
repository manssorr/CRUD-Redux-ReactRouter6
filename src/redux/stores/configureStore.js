import { applyMiddleware, createStore, compose } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

import persistedReducer from "../reducers/rootReducer";

const middlewares = [thunk, logger];

const composeEnhancer =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// new Promise((resolve, reject) => {
//   try {
//     const store = createStore(
//       rootReducer,
//       undefined,
//       compose(
//         autoRehydrate(),
//         applyMiddleware(...middlewares),
//       ),
//     );

//     persistStore(
//       store,
//       { storage: localStorage },
//       () => resolve(store)
//     );
//   } catch (e) {
//     reject(e);
//   }
// });

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
