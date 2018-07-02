import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
// import mediaMiddleware from "./mediaMiddleware";
import spotifyMiddleware from "./spotifyMiddleware";
import { merge } from "./utils";
import { UPDATE_TIME_ELAPSED, STEP_MARQUEE } from "./actionTypes";

const compose = composeWithDevTools({
  actionsBlacklist: [UPDATE_TIME_ELAPSED, STEP_MARQUEE]
});

const logger = createLogger({
  predicate: (getState, action) =>
    action.type !== STEP_MARQUEE && action.type !== UPDATE_TIME_ELAPSED
});

const getStore = (media, stateOverrides) => {
  let initialState;
  if (stateOverrides) {
    initialState = merge(
      reducer(undefined, { type: "@@init" }),
      stateOverrides
    );
  }
  return createStore(
    reducer,
    initialState,
    compose(applyMiddleware(thunk, spotifyMiddleware(media), logger))
  );
};

export default getStore;
