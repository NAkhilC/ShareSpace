import { legacy_createStore as createStore, combineReducers } from "redux";
import appUserReducer from "./reducer/user.reducer";

const rootReducer = combineReducers({
  appUser: appUserReducer,
  userPreferences: appUserReducer,
  resetState: appUserReducer,
  userInterestedItems: appUserReducer,
  filterDataWithUserPref: appUserReducer
});

export const store = createStore(rootReducer);
