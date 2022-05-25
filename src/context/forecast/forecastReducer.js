export const ForecastActionTypes = {
  SET_CURRENT: "[Forecast] Set current",
  SET_HOURLY: "[Forecast] Set hourly",
  SET_DAILY: "[Forecast] Set daily",
  ADD_LOCATION: "[Forecast] Add Location",
};

export const forecastReducer = (state, action) => {
  switch (action.type) {
    case ForecastActionTypes.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ForecastActionTypes.SET_DAILY:
      return {
        ...state,
        daily: action.payload,
      };
    case ForecastActionTypes.SET_HOURLY:
      return {
        ...state,
        hourly: action.payload,
      };
    case ForecastActionTypes.ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, ...action.payload],
      };
    default:
      return state;
  }
};
