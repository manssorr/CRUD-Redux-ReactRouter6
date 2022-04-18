import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";
import filtersReducer from "./filters/users.reducer";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const rootPersistConfig = {
  key: "root",
  storage: storage,
	blacklist: ["users"],
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  key: "users",
  storage: storage,
  blacklist: ["currentUserId", "currentUser"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, usersReducer),
  filter: filtersReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
