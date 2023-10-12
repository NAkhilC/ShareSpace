export const userState = (appState) => {
  return {
    type: "APPUSER",
    payload: appState,
  };
};

export const userInterestedItems = (interestedItems) => {
  return {
    type: "INTERESTED",
    payload: interestedItems,
  };
};

export const resetState = (status) => {
  return {
    type: "RESETSTATE",
    payload: status,
  };
};

export const userPreferences = (preference) => {
  return {
    type: "USERPREFERENCES",
    payload: preference,
  };
};

export const filterDataWithUserPref = (filterItems) => {
  return {
    type: "FILTERDATA",
    payload: filterItems,
  };
};
